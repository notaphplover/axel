import { CardDeckApiV1 } from '../deck/CardDeckApiV1';

export interface PlayerSetupApiV1 {
  deck: CardDeckApiV1;
  userId: string;
}
