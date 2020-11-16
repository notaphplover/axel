/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { GameSetupUpdateQuery } from '../../../../../domain/query/setup/GameSetupUpdateQuery';
import { UpdateGameSetupInteractor } from '../../../../../domain/interactor/setup/UpdateGameSetupInteractor';
import { UpdateRepository } from '../../../../../../../layer-modules/db/domain';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(UpdateGameSetupInteractor.name, () => {
  let extendedGameSetupDbUpdateRepository: UpdateRepository<
    ExtendedGameSetup,
    GameSetupUpdateQuery
  >;

  let updateGameSetupInteractor: UpdateGameSetupInteractor;

  beforeAll(() => {
    extendedGameSetupDbUpdateRepository = ({
      updateOneAndSelect: jest.fn(),
    } as Partial<
      UpdateRepository<ExtendedGameSetup, GameSetupUpdateQuery>
    >) as UpdateRepository<ExtendedGameSetup, GameSetupUpdateQuery>;

    updateGameSetupInteractor = new UpdateGameSetupInteractor(
      extendedGameSetupDbUpdateRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (extendedGameSetupDbUpdateRepository.updateOneAndSelect as jest.Mock).mockResolvedValueOnce(
          extendedGameSetupFixtureFactory.get(),
        );

        result = await updateGameSetupInteractor.interact(
          gameSetupUpdateQueryFixtureFactory.get(),
        );
      });

      it('must call extendedGameSetupDbUpdateRepository.updateOneAndSelect() with the query provided', () => {
        expect(
          extendedGameSetupDbUpdateRepository.updateOneAndSelect,
        ).toHaveBeenCalledTimes(1);
        expect(
          extendedGameSetupDbUpdateRepository.updateOneAndSelect,
        ).toHaveBeenCalledWith(gameSetupUpdateQueryFixtureFactory.get());
      });

      it('must return the game setup updated', () => {
        expect(result).toStrictEqual(extendedGameSetupFixtureFactory.get());
      });
    });
  });
});
