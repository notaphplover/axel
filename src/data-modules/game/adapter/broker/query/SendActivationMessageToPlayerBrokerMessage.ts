import { QueryBrokerApi } from '../../../../../layer-modules/broker/adapter';
import { GameQueryBrokerApiTypes } from './GameQueryBrokerApiTypes';

export interface SendActivationMessageToPlayerBrokerMessage
  extends QueryBrokerApi {
  type: GameQueryBrokerApiTypes.sendActivationMessage;
}
