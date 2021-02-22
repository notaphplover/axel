/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { UpdateRepository } from '../../../../../../../layer-modules/db/domain';
import { UpdateGameSetupInteractor } from '../../../../../domain/interactor/setup/UpdateGameSetupInteractor';
import { GameSetup } from '../../../../../domain/model/setup/GameSetup';
import { GameSetupUpdateQuery } from '../../../../../domain/query/setup/GameSetupUpdateQuery';
import { gameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(UpdateGameSetupInteractor.name, () => {
  let gameSetupDbUpdateRepository: UpdateRepository<
    GameSetup,
    GameSetupUpdateQuery
  >;

  let updateGameSetupInteractor: UpdateGameSetupInteractor;

  beforeAll(() => {
    gameSetupDbUpdateRepository = ({
      updateOneAndSelect: jest.fn(),
    } as Partial<
      UpdateRepository<GameSetup, GameSetupUpdateQuery>
    >) as UpdateRepository<GameSetup, GameSetupUpdateQuery>;

    updateGameSetupInteractor = new UpdateGameSetupInteractor(
      gameSetupDbUpdateRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameSetupDbUpdateRepository.updateOneAndSelect as jest.Mock).mockResolvedValueOnce(
          gameSetupFixtureFactory.get(),
        );

        result = await updateGameSetupInteractor.interact(
          gameSetupUpdateQueryFixtureFactory.get(),
        );
      });

      it('must call gameSetupDbUpdateRepository.updateOneAndSelect() with the query provided', () => {
        expect(
          gameSetupDbUpdateRepository.updateOneAndSelect,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameSetupDbUpdateRepository.updateOneAndSelect,
        ).toHaveBeenCalledWith(gameSetupUpdateQueryFixtureFactory.get());
      });

      it('must return the game setup updated', () => {
        expect(result).toStrictEqual(gameSetupFixtureFactory.get());
      });
    });
  });
});
