import {
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
} from './validator/ValidationResult';
import { Converter } from './converter/Converter';
import { Filter } from './filter/Filter';
import { Interactor } from './interactor/Interactor';
import { Validator } from './validator/Validator';
import { ValidatorFunctionBasedFilter } from './filter/ValidatorFunctionBasedFilter';
import { floatToInt } from './parse/floatToInt';
import { getDirectories } from './io/directory/getDirectories';
import { getFiles } from './io/file/getFiles';
import { hasValue } from './utils/hasValue';
import { isDirectory } from './io/directory/isDirectory';
import { isFile } from './io/file/isFile';
import { mergeReadables } from './io/stream/mergeReadables';
import { rootDir } from './io/rootDir';

export {
  Converter,
  Filter,
  Interactor,
  ValidationFail,
  ValidationResult,
  ValidationSuccess,
  Validator,
  ValidatorFunctionBasedFilter,
};

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
