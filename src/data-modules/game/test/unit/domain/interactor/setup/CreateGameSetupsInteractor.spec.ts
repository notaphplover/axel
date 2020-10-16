/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { CreateGameSetupsInteractor } from '../../../../../domain/interactor/setup/CreateGameSetupsInteractor';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupsCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(CreateGameSetupsInteractor.name, () => {
  let gameSetupInsertRepository: InsertRepository<
    GameSetup,
    GameSetupsCreationQuery
  >;

  let createGameSetupsInteractor: CreateGameSetupsInteractor;

  beforeAll(() => {
    gameSetupInsertRepository = ({
      insert: jest.fn(),
    } as Partial<InsertRepository<GameSetup, GameSetup>>) as InsertRepository<
      GameSetup,
      GameSetupsCreationQuery
    >;

    createGameSetupsInteractor = new CreateGameSetupsInteractor(
      gameSetupInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameSetupInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          gameSetupFixtureFactory.get(),
        ]);

        result = await createGameSetupsInteractor.interact(
          gameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameSetupInsertRepository.insert() with the game setups obtained from the converter', () => {
        expect(gameSetupInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(gameSetupInsertRepository.insert).toHaveBeenCalledWith(
          gameSetupsCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the game setup created', () => {
        expect(result).toStrictEqual([gameSetupFixtureFactory.get()]);
      });
    });
  });
});
