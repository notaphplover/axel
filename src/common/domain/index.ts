import { Converter } from './converter/Converter';
import { Either, EitherEither, ValueEither } from './either/Either';
import { ValueOrErrors } from './either/ValueOrErrors';
import { Filter } from './filter/Filter';
import { ValidatorFunctionBasedFilter } from './filter/ValidatorFunctionBasedFilter';
import { Interactor } from './interactor/Interactor';
import { getDirectories } from './io/directory/getDirectories';
import { isDirectory } from './io/directory/isDirectory';
import { getFiles } from './io/file/getFiles';
import { isFile } from './io/file/isFile';
import { rootDir } from './io/rootDir';
import { mergeReadables } from './io/stream/mergeReadables';
import { Messenger } from './messenger/Messenger';
import { Capsule } from './model/Capsule';
import { Writable } from './model/Writable';
import { floatToInt } from './parse/floatToInt';
import { PaginationQuery } from './query/PaginationQuery';
import { hasOneElement } from './utils/hasOneElement';
import { hasValue } from './utils/hasValue';
import { waitMs } from './utils/waitMs';
import { AsyncValidator } from './validator/AsyncValidator';
import {
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
} from './validator/ValidationResult';
import { Validator } from './validator/Validator';

export {
  AsyncValidator,
  Capsule,
  Converter,
  Either,
  EitherEither,
  Filter,
  Interactor,
  Messenger,
  PaginationQuery,
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
  Validator,
  ValidatorFunctionBasedFilter,
  ValueEither,
  ValueOrErrors,
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
  utils: { hasOneElement, hasValue, waitMs },
};
