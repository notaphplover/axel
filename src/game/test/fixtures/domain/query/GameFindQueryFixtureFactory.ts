import { FixtureFactoryImpl } from '../../../../../common/test';
import { GameFindQuery } from '../../../../domain/query/GameFindQuery';

export class GameFindQueryFixtureFactory extends FixtureFactoryImpl<
  GameFindQuery
> {
  public get(): GameFindQuery {
    return { ...this.data };
  }
}
