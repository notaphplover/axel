// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export type Index<T> = {
  [F in keyof T]: T[F] extends AnyFunction ? never : T[F];
};

export interface EnvLoader<T> {
  index: Index<T>;
  load(): void;
}
