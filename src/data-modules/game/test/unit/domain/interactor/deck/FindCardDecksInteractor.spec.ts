import 'reflect-metadata';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { FindCardDecksInteractor } from '../../../../../domain/interactor/deck/FindCardDecksInteractor';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
import { cardDeckFindQueryFixtureFactory } from '../../../../fixtures/domain/query/deck';

describe(FindCardDecksInteractor.name, () => {
  let cardDeckSearchRepository: SearchRepository<CardDeck, CardDeckFindQuery>;
  let findCardDecksInteractor: FindCardDecksInteractor;

  beforeAll(() => {
    cardDeckSearchRepository = ({
      find: jest.fn(),
    } as Partial<
      SearchRepository<CardDeck, CardDeckFindQuery>
    >) as SearchRepository<CardDeck, CardDeckFindQuery>;

    findCardDecksInteractor = new FindCardDecksInteractor(
      cardDeckSearchRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (cardDeckSearchRepository.find as jest.Mock).mockResolvedValueOnce([
          cardDeckFixtureFactory.get(),
        ]);

        result = await findCardDecksInteractor.interact(
          cardDeckFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardDeckSearchRepository.find() with the received query', () => {
        expect(cardDeckSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(cardDeckSearchRepository.find).toHaveBeenCalledWith(
          cardDeckFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([cardDeckFixtureFactory.get()]);
      });
    });
  });
});
