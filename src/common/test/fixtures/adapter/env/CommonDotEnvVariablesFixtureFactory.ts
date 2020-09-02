import { CommonDotEnvVariables } from '../../../../adapter/env/CommonDotEnvVariables';
import { FixtureFactoryImpl } from '../../domain/fixture/FixtureFactoryImpl';

export class CommonDotEnvVariablesFixtureFactory extends FixtureFactoryImpl<
  CommonDotEnvVariables
> {
  public get(): CommonDotEnvVariables {
    return { ...this.data };
  }
}
