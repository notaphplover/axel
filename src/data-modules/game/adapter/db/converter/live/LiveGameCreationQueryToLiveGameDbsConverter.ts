import { injectable } from 'inversify';
import mongodb from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

import { Converter } from '../../../../../../common/domain';
import { hasValue } from '../../../../../../common/domain/utils/hasValue';
import { EntitiesNotFoundError } from '../../../../../../layer-modules/db/domain';
import { ResourceType } from '../../../../domain/model/card/ResourceType';
import { CardDeck } from '../../../../domain/model/deck/CardDeck';
import { LiveGamePlayerArea } from '../../../../domain/model/live/LiveGamePlayerArea';
import { PlayerSetup } from '../../../../domain/model/setup/PlayerSetup';
import { LiveGameCreationQuery } from '../../../../domain/query/live/LiveGameCreationQuery';
import { LiveGameDb } from '../../model/live/LiveGameDb';

@injectable()
export class LiveGameCreationQueryToLiveGameDbsConverter
  implements
    Converter<LiveGameCreationQuery, mongodb.OptionalId<LiveGameDb>[]> {
  public transform(
    liveGameCreationQuery: LiveGameCreationQuery,
  ): mongodb.OptionalId<LiveGameDb>[] {
    const playerAreas: LiveGamePlayerArea[] = liveGameCreationQuery.gameSetup.playerSetups.map(
      (playerSetup: PlayerSetup) =>
        this.createLiveGamePlayerArea(liveGameCreationQuery, playerSetup),
    );

    return [
      {
        format: liveGameCreationQuery.gameSetup.format,
        round: 1,
        playerAreas: playerAreas,
      },
    ];
  }

  private createLiveGamePlayerArea(
    liveGameCreationQuery: LiveGameCreationQuery,
    playerSetup: PlayerSetup,
  ): LiveGamePlayerArea {
    const deck:
      | CardDeck
      | undefined = liveGameCreationQuery.deckIdToDeckMap.get(
      playerSetup.deckId,
    );

    if (!hasValue(deck)) {
      throw new EntitiesNotFoundError(
        `Expected a Card deck with id ${playerSetup.deckId}`,
      );
    }

    const liveGamePlayerArea: LiveGamePlayerArea = {
      battlefield: {
        permanents: [],
      },
      graveyard: {
        cards: [],
      },
      library: {
        cards: {
          references: [...deck.sections.core.references],
        },
      },
      player: {
        hand: {
          cards: [],
        },
        lives: 20,
        manaPool: {
          [ResourceType.Black]: 0,
          [ResourceType.Blue]: 0,
          [ResourceType.Green]: 0,
          [ResourceType.Red]: 0,
          [ResourceType.Uncolored]: 0,
          [ResourceType.White]: 0,
        },
        targetId: uuidv4(),
      },
    };

    return liveGamePlayerArea;
  }
}
