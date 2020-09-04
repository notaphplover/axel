import { Converter } from './converter/Converter';
import { Interactor } from './interactor/Interactor';
import { SearchRepository } from './db/SearchRepository';
import { Server } from './server/Server';
import { floatToInt } from './parse/floatToInt';
import { getDirectories } from './io/directory/getDirectories';
import { getFiles } from './io/file/getFiles';
import { hasValue } from './utils/hasValue';
import { isDirectory } from './io/directory/isDirectory';
import { isFile } from './io/file/isFile';
import { mergeReadables } from './io/stream/mergeReadables';
import { rootDir } from './io/rootDir';

export { Converter, Interactor, SearchRepository, Server };

// eslint-disable-next-line @typescript-eslint/typedef
export const common = {
  io: {
    directory: {
      getDirectories,
      isDirectory,
    },
    file: {
      getFiles,
      isFile,
    },
    rootDir,
    stream: {
      mergeReadables,
    },
  },
  parse: { floatToInt },
  utils: { hasValue },
};
