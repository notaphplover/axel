import { Game } from '../../../../domain/model/Game';
import { PrototypeBasedFixtureFactory } from '../../../../../common/test';

export class GameFixtureFactory extends PrototypeBasedFixtureFactory<Game> {
  public get(): Game {
    return { ...this.data };
  }
}
