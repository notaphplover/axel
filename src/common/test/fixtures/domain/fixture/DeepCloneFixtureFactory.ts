import { PrototypeBasedFixtureFactory } from './PrototypeBasedFixtureFactory';
import _ from 'lodash';

export class DeepCloneFixtureFactory<
  TData
> extends PrototypeBasedFixtureFactory<TData> {
  public get(): TData {
    return _.cloneDeep(this.data);
  }
}
