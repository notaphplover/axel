import { BrokerQuery } from '../../../../../layer-modules/broker/domain';
import { GameBrokerQueryType } from './GameBrokerQueryType';

export interface SendActivationMessageToPlayerBrokerQuery extends BrokerQuery {
  type: GameBrokerQueryType.sendActivationMessage;
}
