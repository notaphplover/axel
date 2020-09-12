import { GameCreationQuery } from '../../../../../domain/query/GameCreationQuery';
import { PrototypeBasedFixtureFactory } from '../../../../../../common/test';

export class GameCreationQueryApiV1FixtureFactory extends PrototypeBasedFixtureFactory<
  GameCreationQuery
> {
  public get(): GameCreationQuery {
    return { ...this.data };
  }
}
