/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateGamesInteractor } from '../../../../domain/interactor/CreateGamesInteractor';
import { Game } from '../../../../domain/model/Game';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { gameCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';
import { gameFixtureFactory } from '../../../fixtures/domain/model/fixtures';

describe(CreateGamesInteractor.name, () => {
  let gameInsertRepository: InsertRepository<Game, GameCreationQuery>;

  let createGamesInteractor: CreateGamesInteractor;

  beforeAll(() => {
    gameInsertRepository = ({
      insert: jest.fn(),
    } as Partial<
      InsertRepository<Game, GameCreationQuery>
    >) as InsertRepository<Game, GameCreationQuery>;

    createGamesInteractor = new CreateGamesInteractor(gameInsertRepository);
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          gameFixtureFactory.get(),
        ]);

        result = await createGamesInteractor.interact(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameInsertRepository.insert() with the games obtained from the converter', () => {
        expect(gameInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(gameInsertRepository.insert).toHaveBeenCalledWith(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the game created', () => {
        expect(result).toStrictEqual([gameFixtureFactory.get()]);
      });
    });
  });
});
