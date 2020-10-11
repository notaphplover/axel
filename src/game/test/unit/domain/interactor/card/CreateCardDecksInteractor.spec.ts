/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CardDeck } from '../../../../../domain/model/card/CardDeck';
import { CardDeckCreationQuery } from '../../../../../domain/query/card/CardDeckCreationQuery';
import { CreateCardDecksInteractor } from '../../../../../domain/interactor/card/CreateCardDecksInteractor';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { cardDeckCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

describe(CreateCardDecksInteractor.name, () => {
  let cardDeckInsertRepository: InsertRepository<
    CardDeck,
    CardDeckCreationQuery
  >;

  let createCardDecksInteractor: CreateCardDecksInteractor;

  beforeAll(() => {
    cardDeckInsertRepository = ({
      insert: jest.fn(),
    } as Partial<InsertRepository<CardDeck, CardDeck>>) as InsertRepository<
      CardDeck,
      CardDeckCreationQuery
    >;

    createCardDecksInteractor = new CreateCardDecksInteractor(
      cardDeckInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (cardDeckInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          cardDeckFixtureFactory.get(),
        ]);

        result = await createCardDecksInteractor.interact(
          cardDeckCreationQueryFixtureFactory.get(),
        );
      });

      it('must call cardDeckInsertRepository.insert() with the card decks obtained from the converter', () => {
        expect(cardDeckInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(cardDeckInsertRepository.insert).toHaveBeenCalledWith(
          cardDeckCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the card deck created', () => {
        expect(result).toStrictEqual([cardDeckFixtureFactory.get()]);
      });
    });
  });
});
