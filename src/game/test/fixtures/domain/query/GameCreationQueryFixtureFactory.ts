import { FixtureFactoryImpl } from '../../../../../common/test';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';

export class GameCreationQueryFixtureFactory extends FixtureFactoryImpl<
  GameCreationQuery
> {
  public get(): GameCreationQuery {
    return { ...this.data };
  }
}
