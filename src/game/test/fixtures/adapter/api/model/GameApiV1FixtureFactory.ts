import { GameApiV1 } from '../../../../../adapter/api/model/GameApiV1';
import { PrototypeBasedFixtureFactory } from '../../../../../../common/test';

export class GameApiV1FixtureFactory extends PrototypeBasedFixtureFactory<
  GameApiV1
> {
  public get(): GameApiV1 {
    return { ...this.data };
  }
}
