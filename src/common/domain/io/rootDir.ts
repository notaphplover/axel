import * as path from 'path';

const JUMPS_TO_PARENT: number = 4;

const REGEXP_INDEX_TO_EXTRACT: number = 1;

// Yeah, building a RegExp for just one exec call
const extractRootDirectoryRegExp: RegExp = new RegExp(
  `(.*)(\\${path.sep}[^\\${path.sep}]+){${JUMPS_TO_PARENT}}\\${path.sep}?`,
);

const innerRootDir: string | undefined = extractRootDirectoryRegExp.exec(
  __dirname,
)?.[REGEXP_INDEX_TO_EXTRACT];

if (innerRootDir === undefined) {
  throw new Error('[rootDir] Unexpected directory');
}

export const rootDir: string = innerRootDir;
