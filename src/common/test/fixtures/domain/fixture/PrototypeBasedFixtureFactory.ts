import { FixtureFactory } from './FixtureFactory';

export abstract class PrototypeBasedFixtureFactory<TData>
  implements FixtureFactory<TData> {
  constructor(protected data: TData) {}

  public abstract get(): TData;
}
