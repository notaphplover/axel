import 'reflect-metadata';
import { PassThrough, Readable } from 'stream';
import { basename, join } from 'path';
import {
  copyFileSync,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
} from 'fs';
import { commonDomain } from '../common/domain';
import { ncp } from 'ncp';

const rootDir: string = commonDomain.io.rootDir;

const distFolder: string = join(rootDir, 'dist');

const distDataModulesFolder: string = join(distFolder, 'data-modules');

const distIntegrationModulesFolder: string = join(
  distFolder,
  'integration-modules',
);

const distLayerModulesFolder: string = join(distFolder, 'layer-modules');

const srcFolder: string = join(rootDir, 'src');

const srcDataModulesFolder: string = join(srcFolder, 'data-modules');

const srcIntegrationModulesFolder: string = join(
  srcFolder,
  'integration-modules',
);

const srcLayerModulesFolder: string = join(srcFolder, 'layer-modules');

const modulesBlackList: Set<string> = new Set([
  'json-schema',
  'data-modules',
  'integration-modules',
  'layer-modules',
  'scripts',
]);

const ENV_MERGE: string = 'docker';
const ENV_MERGE_DESTINATION: string = join(rootDir, '.env');

const getDirectories: (source: string) => string[] =
  commonDomain.io.directory.getDirectories;

const getFiles: (source: string) => string[] = commonDomain.io.file.getFiles;

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

async function copyEnvToDist(): Promise<void> {
  if (!existsSync(distFolder)) {
    return;
  }

  const modulePathToModulePathAndFolderMapper: (
    modulePath: string,
  ) => [string, string] = (modulePath: string) => [
    basename(modulePath),
    modulePath,
  ];

  const distModulePaths: string[] = detectModulesAtFolders([
    distFolder,
    distDataModulesFolder,
    distIntegrationModulesFolder,
    distLayerModulesFolder,
  ]);

  const distModulePathsByFolder: Map<string, string> = new Map(
    distModulePaths.map((modulePath: string) =>
      modulePathToModulePathAndFolderMapper(modulePath),
    ),
  );

  const srcModulePaths: string[] = detectModulesAtFolders([
    srcFolder,
    srcDataModulesFolder,
    srcIntegrationModulesFolder,
    srcLayerModulesFolder,
  ]);

  const srcModulePathsByFolder: Map<string, string> = new Map(
    srcModulePaths.map((modulePath: string) =>
      modulePathToModulePathAndFolderMapper(modulePath),
    ),
  );

  const copyPromises: Promise<void>[] = [];

  for (const [srcModuleName, srcModulePath] of srcModulePathsByFolder) {
    const distModulePath: string | undefined = distModulePathsByFolder.get(
      srcModuleName,
    );

    if (distModulePath !== undefined) {
      const srcGeneratedJsonSchemaAdapterFolder: string = join(
        srcModulePath,
        'env',
      );
      const distGeneratedJsonSchemaAdapterFolder: string = join(
        distModulePath,
        'env',
      );

      if (existsSync(srcGeneratedJsonSchemaAdapterFolder)) {
        if (!existsSync(distGeneratedJsonSchemaAdapterFolder)) {
          mkdirSync(distGeneratedJsonSchemaAdapterFolder, {
            mode: '0754',
            recursive: true,
          });
        }

        copyPromises.push(
          new Promise<void>(
            (
              resolve: (value: void) => void,
              reject: (reason: unknown) => void,
            ) => {
              ncp(
                srcGeneratedJsonSchemaAdapterFolder,
                distGeneratedJsonSchemaAdapterFolder,
                (err: Error[] | null) => {
                  if (err === null) {
                    resolve();
                  } else {
                    reject(err);
                  }
                },
              );
            },
          ),
        );
      }
    }
  }

  await Promise.all(copyPromises);
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

  const srcModulePaths: string[] = detectModulesAtFolders([
    srcFolder,
    srcDataModulesFolder,
    srcIntegrationModulesFolder,
    srcLayerModulesFolder,
  ]);

  console.log(`Found ${srcModulePaths.length} modules.`);

  srcModulePaths.forEach((modulePath: string) => {
    console.log(` - ${modulePath}`);
  });

  console.log('Copying sample files into env files ...');

  srcModulePaths.forEach(copySampleEnvFiles);

  console.log('Merging env files into .env ...');

  mergeEnvFiles(srcModulePaths, ENV_MERGE, ENV_MERGE_DESTINATION);

  console.log('Copying env files to the build ...');

  await copyEnvToDist();

  console.log('Done');
})();
