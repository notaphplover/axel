import { DbDotEnvVariables } from '../../../../adapter/env/DbDotEnvVariables';
import { FixtureFactoryImpl } from '../../../../../../common/test/fixtures/domain/fixture/FixtureFactoryImpl';

export class DbDotEnvVariablesFixtureFactory extends FixtureFactoryImpl<
  DbDotEnvVariables
> {
  public get(): DbDotEnvVariables {
    return { ...this.data };
  }
}
