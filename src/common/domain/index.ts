import { Converter } from './converter/Converter';
import { Filter } from './filter/Filter';
import { ValidatorFunctionBasedFilter } from './filter/ValidatorFunctionBasedFilter';
import { Interactor } from './interactor/Interactor';
import { getDirectories } from './io/directory/getDirectories';
import { isDirectory } from './io/directory/isDirectory';
import { getFiles } from './io/file/getFiles';
import { isFile } from './io/file/isFile';
import { rootDir } from './io/rootDir';
import { mergeReadables } from './io/stream/mergeReadables';
import { Capsule } from './model/Capsule';
import { Writable } from './model/Writable';
import { floatToInt } from './parse/floatToInt';
import { PaginationQuery } from './query/PaginationQuery';
import { hasValue } from './utils/hasValue';
import { waitMs } from './utils/waitMs';
import {
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
} from './validator/ValidationResult';
import { Validator } from './validator/Validator';

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
