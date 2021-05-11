import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../../common/test';
import { CardDeckCreationQueryApiV1 } from '../../../../../adapter/api/query/deck/CardDeckCreationQueryApiV1';
import { cardDeckApiV1 } from '../model/deck';

export const cardDeckCreationQueryApiV1: CardDeckCreationQueryApiV1 = {
  description: cardDeckApiV1.description,
  format: cardDeckApiV1.format,
  name: cardDeckApiV1.name,
  sections: {
    core: {
      references: [...cardDeckApiV1.sections.core.references],
    },
    sideboard: {
      references: [...cardDeckApiV1.sections.sideboard.references],
    },
  },
};

export const cardDeckCreationQueryApiV1FixtureFactory: FixtureFactory<CardDeckCreationQueryApiV1> =
  new DeepCloneFixtureFactory(cardDeckCreationQueryApiV1);
