import { FixtureFactory } from './FixtureFactory';

export abstract class FixtureFactoryImpl<TData>
  implements FixtureFactory<TData> {
  constructor(protected data: TData) {}

  public abstract get(): TData;
}
