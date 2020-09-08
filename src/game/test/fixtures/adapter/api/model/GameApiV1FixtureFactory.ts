import { FixtureFactoryImpl } from '../../../../../../common/test';
import { GameApiV1 } from '../../../../../adapter/api/model/GameApiV1';

export class GameApiV1FixtureFactory extends FixtureFactoryImpl<GameApiV1> {
  public get(): GameApiV1 {
    return { ...this.data };
  }
}
