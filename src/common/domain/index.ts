import { Converter } from './converter/Converter';
import { Interactor } from './interactor/Interactor';
import { SearchRepository } from './db/SearchRepository';
import { Server } from './server/Server';
import { floatToInt } from './parse/floatToInt';
import { hasValue } from './utils/hasValue';
import { rootDir } from './io/rootDir';

export { Converter, Interactor, SearchRepository, Server };

// eslint-disable-next-line @typescript-eslint/typedef
export const common = {
  io: {
    rootDir,
  },
  parse: { floatToInt },
  utils: { hasValue },
};
