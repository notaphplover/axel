import { PassThrough, Readable } from 'stream';
import {
  copyFileSync,
  createReadStream,
  createWriteStream,
  existsSync,
  lstatSync,
  readdirSync,
} from 'fs';
import { common } from '../common/domain';
import { join } from 'path';

const rootDir: string = common.io.rootDir;

const srcFolder: string = join(rootDir, 'src');

const modulesBlackList: Set<string> = new Set(['scripts', 'test']);

const ENV_MERGE: string = 'local';
const ENV_MERGE_DESTINATION: string = join(rootDir, '.env');

function isDirectory(source: string): boolean {
  return lstatSync(source).isDirectory();
}

function isFile(source: string): boolean {
  return lstatSync(source).isFile();
}

function getDirectories(source: string): string[] {
  return readdirSync(source).filter((directoryName: string) =>
    isDirectory(join(source, directoryName)),
  );
}

function getFiles(source: string): string[] {
  return readdirSync(source).filter((fileName: string) =>
    isFile(join(source, fileName)),
  );
}

function detectModules(baseFolder: string): string[] {
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

(() => {
  console.log('Scanning for modules...');

  const modulePaths: string[] = detectModules(srcFolder);

  console.log(`Found ${modulePaths.length} modules.`);

  modulePaths.forEach((modulePath: string) => {
    console.log(` - ${modulePath}`);
  });

  console.log('Copying sample files into env files ...');

  modulePaths.forEach(copySampleEnvFiles);

  console.log('Merging env files into .env ...');

  mergeReadables(
    ...(modulePaths
      .map((modulePath: string) => {
        return getSampleEnvFileStream(modulePath, ENV_MERGE);
      })
      .filter(
        (stream: Readable | undefined) => stream !== undefined,
      ) as Readable[]),
  ).pipe(createWriteStream(ENV_MERGE_DESTINATION));

  console.log('Done');
})();
