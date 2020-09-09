import { FixtureFactoryImpl } from '../../../../../common/test';
import { NoIdGame } from '../../../../domain/model/Game';

export class NoIdGameFixtureFactory extends FixtureFactoryImpl<NoIdGame> {
  public get(): NoIdGame {
    return { ...this.data };
  }
}
