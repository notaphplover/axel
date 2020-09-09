import 'reflect-metadata';
import { JsonSchemaGenerator, jsonSchemaDomain } from '../json-schema/domain';
import { PassThrough, Readable } from 'stream';
import {
  copyFileSync,
  createReadStream,
  createWriteStream,
  existsSync,
} from 'fs';
import { common } from '../common/domain';
import { container } from '../common/adapter/config/container';
import { join } from 'path';

const rootDir: string = common.io.rootDir;

const srcFolder: string = join(rootDir, 'src');

const layerModulesFolder: string = join(srcFolder, 'layer-modules');

const modulesBlackList: Set<string> = new Set([
  'json-schema',
  'layer-modules',
  'scripts',
]);

const ENV_MERGE: string = 'local';
const ENV_MERGE_DESTINATION: string = join(rootDir, '.env');

const getDirectories: (source: string) => string[] =
  common.io.directory.getDirectories;

const getFiles: (source: string) => string[] = common.io.file.getFiles;

const jsonSchemaGenerator: JsonSchemaGenerator = container.get(
  jsonSchemaDomain.config.types.generator.JSON_SCHEMA_GENERATOR,
);

function detectModulesAtFolders(baseFolders: string[]): string[] {
  const modules: string[] = [];

  for (const folder of baseFolders) {
    modules.push(...detectModulesAtFolder(folder));
  }

  return modules;
}

function detectModulesAtFolder(baseFolder: string): string[] {
  return getDirectories(baseFolder)
    .filter((folderName: string) => !modulesBlackList.has(folderName))
    .map((folderName: string) => join(baseFolder, folderName));
}

function getEnvDirectory(modulePath: string): string {
  return join(modulePath, 'env');
}

function copySampleEnvFiles(modulePath: string): void {
  const moduleEnvDirectory: string = getEnvDirectory(modulePath);

  if (!existsSync(moduleEnvDirectory)) {
    return;
  }

  getFiles(moduleEnvDirectory)
    .filter((file: string) => file.endsWith('.env.example'))
    .forEach((file: string) => {
      const newFile: string = file.substr(0, file.length - '.example'.length);

      copyFileSync(
        join(moduleEnvDirectory, file),
        join(moduleEnvDirectory, newFile),
      );
    });
}

function getSampleEnvFileStream(
  modulePath: string,
  env: string,
): Readable | undefined {
  const envFilePath: string = join(getEnvDirectory(modulePath), `${env}.env`);
  if (existsSync(envFilePath)) {
    return createReadStream(envFilePath);
  } else {
    return undefined;
  }
}

function mergeReadables(...streams: Readable[]): PassThrough {
  let pass: PassThrough = new PassThrough();
  let waiting: number = streams.length;
  for (const stream of streams) {
    pass = stream.pipe(pass, { end: false });
    stream.once('end', () => {
      if (--waiting === 0) {
        pass.end();
      }
    });
  }
  return pass;
}

function mergeEnvFiles(
  modulePaths: string[],
  env: string,
  destinationPath: string,
): void {
  mergeReadables(
    ...(modulePaths
      .map((modulePath: string) => {
        return getSampleEnvFileStream(modulePath, env);
      })
      .filter(
        (stream: Readable | undefined) => stream !== undefined,
      ) as Readable[]),
  ).pipe(createWriteStream(destinationPath));
}

void (async () => {
  console.log('Scanning for modules...');

  const modulePaths: string[] = detectModulesAtFolders([
    srcFolder,
    layerModulesFolder,
  ]);

  console.log(`Found ${modulePaths.length} modules.`);

  modulePaths.forEach((modulePath: string) => {
    console.log(` - ${modulePath}`);
  });

  console.log('Copying sample files into env files ...');

  modulePaths.forEach(copySampleEnvFiles);

  console.log('Merging env files into .env ...');

  mergeEnvFiles(modulePaths, ENV_MERGE, ENV_MERGE_DESTINATION);

  console.log('Generating JSON validation schemas...');

  await Promise.all(
    modulePaths.map(jsonSchemaGenerator.generate.bind(jsonSchemaGenerator)),
  );

  console.log('Done');
})();
