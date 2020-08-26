import { Interactor } from './interactor/Interactor';
import { SearchRepository } from './db/SearchRepository';
import { Server } from './server/Server';
import { floatToInt } from './parse/floatToInt';
import { hasValue } from './utils/hasValue';

export { Interactor, SearchRepository, Server };

// eslint-disable-next-line @typescript-eslint/typedef
export const common = {
  parse: { floatToInt },
  utils: { hasValue },
};
