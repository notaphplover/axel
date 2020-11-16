import 'reflect-metadata';
import {
  ExtendedGameSetupDb,
  extendedGameSetupDbSchema,
} from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDbUpdateRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbUpdateRepository';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { GameSetupUpdateQuery } from '../../../../../domain/query/setup/GameSetupUpdateQuery';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';
import { gameSetupUpdateQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

const container: Container = configAdapter.container;

const mongooseIntegrationDescribe: jest.Describe =
  dbTest.integration.utils.mongooseIntegrationDescribe;

async function clearCollection<T extends Document>(
  model: Model<T>,
): Promise<void> {
  await model.deleteMany({});
}

function createExtendedGameSetupMongooseModelMock(
  alias: string,
): Model<ExtendedGameSetupDb> {
  return mongoose.model<ExtendedGameSetupDb>(
    alias,
    extendedGameSetupDbSchema,
    alias,
  );
}

function injectExtendedGameSetupMongooseModelMock(
  container: Container,
  model: Model<ExtendedGameSetupDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(ExtendedGameSetupDbUpdateRepository.name, () => {
  describe('.updateAndSelect()', () => {
    describe('when called', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;

      let extendedGameSetupDbInserted: ExtendedGameSetupDb;
      let gameSetupUpdateQueryFixture: GameSetupUpdateQuery;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'ExtendedGameSetupDbUpdateRepositoryModel';

        extendedGameSetupModelMock = createExtendedGameSetupMongooseModelMock(
          collectionName,
        );

        await clearCollection(extendedGameSetupModelMock);

        // eslint-disable-next-line @typescript-eslint/typedef
        [
          extendedGameSetupDbInserted,
        ] = await extendedGameSetupModelMock.insertMany([
          new extendedGameSetupModelMock({
            format: extendedGameSetupFixtureFactory.get().format,
            ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
            playerSetups: extendedGameSetupFixtureFactory.get().playerSetups,
            playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
          }),
        ]);

        const childContainer: Container = container.createChild();

        injectExtendedGameSetupMongooseModelMock(
          childContainer,
          extendedGameSetupModelMock,
        );

        const extendedGameSetupDbUpdateRepository: ExtendedGameSetupDbUpdateRepository = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_UPDATE_REPOSITORY,
        );

        gameSetupUpdateQueryFixture = gameSetupUpdateQueryFixtureFactory.get();

        gameSetupUpdateQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

        result = await extendedGameSetupDbUpdateRepository.updateAndSelect(
          gameSetupUpdateQueryFixture,
        );
      });

      afterAll(async () => {
        await clearCollection(extendedGameSetupModelMock);
      });

      it('must return the game setup updated', () => {
        expect(result).toHaveProperty('length');
        expect((result as unknown[]).length).toBe(1);

        const [innerResult]: unknown[] = result as unknown[];

        expect((innerResult as ExtendedGameSetup).id).toBe(
          extendedGameSetupDbInserted.id,
        );

        expect((innerResult as ExtendedGameSetup).playerSetups).toEqual([
          ...extendedGameSetupDbInserted.playerSetups,
          ...gameSetupUpdateQueryFixture.additionalPlayerSetups,
        ]);
      });
    });
  });
});
