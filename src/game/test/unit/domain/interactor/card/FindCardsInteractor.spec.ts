/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Card } from '../../../../../domain/model/card/Card';
import { CardFindQuery } from '../../../../../domain/query/card/CardFindQuery';
import { FindCardsInteractor } from '../../../../../domain/interactor/card/FindCardsInteractor';
import { SearchRepository } from '../../../../../../layer-modules/db/domain';
import { artifactFindQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { artifactFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

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
          artifactFixtureFactory.get(),
        ]);

        result = await findCardsInteractor.interact(
          artifactFindQueryFixtureFactory.get(),
        );
      });

      it('must call cardSearchRepository.find() with the received query', () => {
        expect(cardSearchRepository.find).toHaveBeenCalledTimes(1);
        expect(cardSearchRepository.find).toHaveBeenCalledWith(
          artifactFindQueryFixtureFactory.get(),
        );
      });

      it('must return the repository result', () => {
        expect(result).toStrictEqual([artifactFixtureFactory.get()]);
      });
    });
  });
});
