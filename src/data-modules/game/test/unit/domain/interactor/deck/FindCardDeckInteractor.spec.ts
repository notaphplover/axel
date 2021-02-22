/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { FindCardDeckInteractor } from '../../../../../domain/interactor/deck/FindCardDeckInteractor';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
import { cardDeckFindQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';

describe(FindCardDeckInteractor.name, () => {
  let cardDeckSearchRepository: SearchRepository<CardDeck, CardDeckFindQuery>;
  let findCardDecksInteractor: FindCardDeckInteractor;

  beforeAll(() => {
    cardDeckSearchRepository = ({
      findOne: jest.fn(),
    } as Partial<
      SearchRepository<CardDeck, CardDeckFindQuery>
    >) as SearchRepository<CardDeck, CardDeckFindQuery>;

    findCardDecksInteractor = new FindCardDeckInteractor(
      cardDeckSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (cardDeckSearchRepository.findOne as jest.Mock).mockResolvedValueOnce(
          cardDeckFixtureFactory.get(),
        );

        result = await findCardDecksInteractor.interact(
          cardDeckFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardDeckSearchRepository.findOne() with the received query', () => {
        expect(cardDeckSearchRepository.findOne).toHaveBeenCalledTimes(1);
        expect(cardDeckSearchRepository.findOne).toHaveBeenCalledWith(
          cardDeckFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual(cardDeckFixtureFactory.get());
      });
    });
  });
});
