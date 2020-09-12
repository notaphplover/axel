import { DbDotEnvVariables } from '../../../../adapter/env/DbDotEnvVariables';
import { PrototypeBasedFixtureFactory } from '../../../../../../common/test';

export class DbDotEnvVariablesFixtureFactory extends PrototypeBasedFixtureFactory<
  DbDotEnvVariables
> {
  public get(): DbDotEnvVariables {
    return { ...this.data };
  }
}
