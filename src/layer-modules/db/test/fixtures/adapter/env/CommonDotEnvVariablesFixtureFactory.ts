import { CommonDotEnvVariables } from '../../../../adapter/env/DbDotEnvVariables';
import { FixtureFactoryImpl } from '../../../../../../common/test/fixtures/domain/fixture/FixtureFactoryImpl';

export class CommonDotEnvVariablesFixtureFactory extends FixtureFactoryImpl<
  CommonDotEnvVariables
> {
  public get(): CommonDotEnvVariables {
    return { ...this.data };
  }
}
