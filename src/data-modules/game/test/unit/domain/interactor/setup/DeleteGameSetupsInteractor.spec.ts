import 'reflect-metadata';
import { DeleteRepository } from '../../../../../../../layer-modules/db/domain';
import { DeleteGameSetupsInteractor } from '../../../../../domain/interactor/setup/DeleteGameSetupsInteractor';
import { GameSetupDeletionQuery } from '../../../../../domain/query/setup/GameSetupDeletionQuery';
import { gameSetupDeletionQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(DeleteGameSetupsInteractor.name, () => {
  let gameSetupDeleteRepository: jest.Mocked<
    DeleteRepository<GameSetupDeletionQuery>
  >;

  let deleteGameSetupsInteractor: DeleteGameSetupsInteractor;

  beforeAll(() => {
    gameSetupDeleteRepository = {
      delete: jest.fn(),
    } as Partial<
      jest.Mocked<DeleteRepository<GameSetupDeletionQuery>>
    > as jest.Mocked<DeleteRepository<GameSetupDeletionQuery>>;

    deleteGameSetupsInteractor = new DeleteGameSetupsInteractor(
      gameSetupDeleteRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        gameSetupDeleteRepository.delete.mockResolvedValueOnce(undefined);

        result = await deleteGameSetupsInteractor.interact(
          gameSetupDeletionQueryFixtureFactory.get(),
        );
      });

      it('must call gameSetupInsertRepository.delete() with the game setups obtained from the converter', () => {
        expect(gameSetupDeleteRepository.delete).toHaveBeenCalledTimes(1);
        expect(gameSetupDeleteRepository.delete).toHaveBeenCalledWith(
          gameSetupDeletionQueryFixtureFactory.get(),
        );
      });

      it('must return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
