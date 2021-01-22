import { Either } from './Either';

export type ValueOrErrors<TValue> = Either<TValue, string[]>;
