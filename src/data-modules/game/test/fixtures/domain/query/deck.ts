import {
  DeepCloneFixtureFactory,
  FixtureFactory,
} from '../../../../../../common/test';
import { CardDeckCreationQuery } from '../../../../domain/query/deck/CardDeckCreationQuery';
import { CardDeckFindQuery } from '../../../../domain/query/deck/CardDeckFindQuery';
import { cardDeck } from '../model/deck';

export const cardDeckCreationQuery: CardDeckCreationQuery = {
  description: cardDeck.description,
  format: cardDeck.format,
  name: cardDeck.name,
  sections: cardDeck.sections,
};

export const cardDeckCreationQueryFixtureFactory: FixtureFactory<CardDeckCreationQuery> = new DeepCloneFixtureFactory(
  cardDeckCreationQuery,
);

export const cardDeckFindQuery: CardDeckFindQuery = {
  id: cardDeck.id,
  ids: [cardDeck.id],
};

export const cardDeckFindQueryFixtureFactory: FixtureFactory<CardDeckFindQuery> = new DeepCloneFixtureFactory(
  cardDeckFindQuery,
);
