import { NoIdGame } from '../../../../domain/model/Game';
import { PrototypeBasedFixtureFactory } from '../../../../../common/test';

export class NoIdGameFixtureFactory extends PrototypeBasedFixtureFactory<
  NoIdGame
> {
  public get(): NoIdGame {
    return { ...this.data };
  }
}
