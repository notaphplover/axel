import 'reflect-metadata';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { FindCardsInteractor } from '../../../../../domain/interactor/card/FindCardsInteractor';
import { Card } from '../../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../../domain/query/card/CardFindQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { creatureFindQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(FindCardsInteractor.name, () => {
  let cardSearchRepository: SearchRepository<Card, CardFindQuery>;
  let findCardsInteractor: FindCardsInteractor;

  beforeAll(() => {
    cardSearchRepository = ({
      find: jest.fn(),
    } as Partial<SearchRepository<Card, CardFindQuery>>) as SearchRepository<
      Card,
      CardFindQuery
    >;

    findCardsInteractor = new FindCardsInteractor(cardSearchRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (cardSearchRepository.find as jest.Mock).mockResolvedValueOnce([
          creatureFixtureFactory.get(),
        ]);

        result = await findCardsInteractor.interact(
          creatureFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardSearchRepository.find() with the received query', () => {
        expect(cardSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(cardSearchRepository.find).toHaveBeenCalledWith(
          creatureFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([creatureFixtureFactory.get()]);
      });
    });
  });
});
