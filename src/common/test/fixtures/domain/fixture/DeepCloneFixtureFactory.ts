import _ from 'lodash';

import { PrototypeBasedFixtureFactory } from './PrototypeBasedFixtureFactory';

export class DeepCloneFixtureFactory<
  TData
> extends PrototypeBasedFixtureFactory<TData> {
  public get(): TData {
    return _.cloneDeep(this.data);
  }
}
