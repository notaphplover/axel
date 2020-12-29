/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateLiveGamesInteractor } from '../../../../../domain/interactor/live/CreateLiveGamesInteractor';
import { GameCreationQuery } from '../../../../../domain/query/GameCreationQuery';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { LiveGame } from '../../../../../domain/model/live/LiveGame';
import { gameCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';
import { gameFixtureFactory } from '../../../../fixtures/domain/model';

describe(CreateLiveGamesInteractor.name, () => {
  let gameInsertRepository: InsertRepository<LiveGame, GameCreationQuery>;

  let createGamesInteractor: CreateLiveGamesInteractor;

  beforeAll(() => {
    gameInsertRepository = ({
      insert: jest.fn(),
    } as Partial<
      InsertRepository<LiveGame, GameCreationQuery>
    >) as InsertRepository<LiveGame, GameCreationQuery>;

    createGamesInteractor = new CreateLiveGamesInteractor(gameInsertRepository);
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
