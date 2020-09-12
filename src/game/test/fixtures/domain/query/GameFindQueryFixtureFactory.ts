import { GameFindQuery } from '../../../../domain/query/GameFindQuery';
import { PrototypeBasedFixtureFactory } from '../../../../../common/test';

export class GameFindQueryFixtureFactory extends PrototypeBasedFixtureFactory<
  GameFindQuery
> {
  public get(): GameFindQuery {
    return { ...this.data };
  }
}
