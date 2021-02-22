import {
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
} from './validator/ValidationResult';
import { Capsule } from './model/Capsule';
import { Converter } from './converter/Converter';
import { Filter } from './filter/Filter';
import { Interactor } from './interactor/Interactor';
import { PaginationQuery } from './query/PaginationQuery';
import { Validator } from './validator/Validator';
import { ValidatorFunctionBasedFilter } from './filter/ValidatorFunctionBasedFilter';
import { Writable } from './model/Writable';
import { floatToInt } from './parse/floatToInt';
import { getDirectories } from './io/directory/getDirectories';
import { getFiles } from './io/file/getFiles';
import { hasValue } from './utils/hasValue';
import { isDirectory } from './io/directory/isDirectory';
import { isFile } from './io/file/isFile';
import { mergeReadables } from './io/stream/mergeReadables';
import { rootDir } from './io/rootDir';
import { waitMs } from './utils/waitMs';

export {
  Capsule,
  Converter,
  Filter,
  Interactor,
  PaginationQuery,
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
  Validator,
  ValidatorFunctionBasedFilter,
  Writable,
};

// eslint-disable-next-line @typescript-eslint/typedef
export const commonDomain = {
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
  utils: { hasValue, waitMs },
};
