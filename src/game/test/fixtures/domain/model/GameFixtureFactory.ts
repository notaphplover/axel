import { FixtureFactoryImpl } from '../../../../../common/test';
import { Game } from '../../../../domain/model/Game';

export class GameFixtureFactory extends FixtureFactoryImpl<Game> {
  public get(): Game {
    return { ...this.data };
  }
}
