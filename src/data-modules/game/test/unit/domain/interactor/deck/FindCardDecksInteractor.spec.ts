/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { FindCardDecksInteractor } from '../../../../../domain/interactor/deck/FindCardDecksInteractor';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { cardDeckFindQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

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
