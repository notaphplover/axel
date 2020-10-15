import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { CardDeckApiV1 } from '../../../../../adapter/api/model/deck/CardDeckApiV1';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { cardDeck } from '../../../domain/model/deck';

export const cardDeckApiV1: CardDeckApiV1 = {
  description: cardDeck.description,
  format: GameFormatApiV1.UNRESTRICTED,
  id: cardDeck.id,
  name: cardDeck.name,
  sections: {
    core: {
      references: [...cardDeck.sections.core.references],
    },
    sideboard: {
      references: [...cardDeck.sections.sideboard.references],
    },
  },
};

export const cardDeckApiV1FixtureFactory: FixtureFactory<CardDeckApiV1> = new DeepCloneFixtureFactory(
  cardDeckApiV1,
);
