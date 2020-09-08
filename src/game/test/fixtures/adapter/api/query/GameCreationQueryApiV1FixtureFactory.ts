import { FixtureFactoryImpl } from '../../../../../../common/test';
import { GameCreationQuery } from '../../../../../domain/query/GameCreationQuery';

export class GameCreationQueryApiV1FixtureFactory extends FixtureFactoryImpl<
  GameCreationQuery
> {
  public get(): GameCreationQuery {
    return { ...this.data };
  }
}
