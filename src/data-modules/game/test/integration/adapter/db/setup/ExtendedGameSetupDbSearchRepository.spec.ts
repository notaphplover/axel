import 'reflect-metadata';
import {
  ExtendedGameSetupDb,
  extendedGameSetupDbSchema,
} from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import mongoose, { Document, Model } from 'mongoose';
import { Container } from 'inversify';
import { ExtendedGameSetup } from '../../../../../domain/model/setup/ExtendedGameSetup';
import { ExtendedGameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/ExtendedGameSetupDbSearchRepository';
import { ExtendedGameSetupFindQuery } from '../../../../../domain/query/setup/ExtendedGameSetupFindQuery';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';
import { extendedGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { extendedGameSetupFixtureFactory } from '../../../../fixtures/domain/model/setup';

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

function injectGameMongooseModelMock(
  container: Container,
  model: Model<ExtendedGameSetupDb>,
): void {
  container
    .bind(GAME_ADAPTER_TYPES.db.model.setup.EXTENDED_GAME_SETUP_DB_MODEL)
    .toConstantValue(model);
}

mongooseIntegrationDescribe(ExtendedGameSetupDbSearchRepository.name, () => {
  describe('.find()', () => {
    describe('when called and some game setups satisfies the query', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;
      let extendedGameSetupFindQueryFixture: ExtendedGameSetupFindQuery;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'ExtendedGameSetupDbSearchRepositoryModelSuccess';

        extendedGameSetupModelMock = createExtendedGameSetupMongooseModelMock(
          collectionName,
        );

        await clearCollection(extendedGameSetupModelMock);

        const [
          extendedGameSetupDbInserted,
        ]: ExtendedGameSetupDb[] = await extendedGameSetupModelMock.insertMany([
          new extendedGameSetupModelMock({
            format: extendedGameSetupFixtureFactory.get().format,
            ownerUserId: extendedGameSetupFixtureFactory.get().ownerUserId,
            playerSetups: extendedGameSetupFixtureFactory.get().playerSetups,
            playerSlots: extendedGameSetupFixtureFactory.get().playerSlots,
          }),
        ]);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, extendedGameSetupModelMock);

        const extendedGameSetupDbSearchRepository: SearchRepository<
          ExtendedGameSetup,
          ExtendedGameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_SEARCH_REPOSITORY,
        );

        extendedGameSetupFindQueryFixture = extendedGameSetupFindQueryFixtureFactory.get();
        extendedGameSetupFindQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

        result = await extendedGameSetupDbSearchRepository.find(
          extendedGameSetupFindQueryFixture,
        );
      });

      afterAll(async () => {
        await clearCollection(extendedGameSetupModelMock);
      });

      it('must return the game setups', () => {
        const expectedExtendedGameSetupResult: ExtendedGameSetup = extendedGameSetupFixtureFactory.get();
        expectedExtendedGameSetupResult.id = extendedGameSetupFindQueryFixture.id as string;

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [gameResult]: unknown[] = result as unknown[];

        expect(gameResult as ExtendedGameSetup).toEqual(
          expectedExtendedGameSetupResult,
        );
      });
    });

    describe('when called and no game setup satisfies the query', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'ExtendedGameSetupDbSearchRepositoryModelFail';

        extendedGameSetupModelMock = createExtendedGameSetupMongooseModelMock(
          collectionName,
        );

        await clearCollection(extendedGameSetupModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, extendedGameSetupModelMock);

        const extendedGameSetupDbSearchRepository: SearchRepository<
          ExtendedGameSetup,
          ExtendedGameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup
            .EXTENDED_GAME_SETUP_SEARCH_REPOSITORY,
        );

        result = await extendedGameSetupDbSearchRepository.find(
          extendedGameSetupFindQueryFixtureFactory.get(),
        );
      });

      afterAll(async () => {
        await clearCollection(extendedGameSetupModelMock);
      });

      it('must return no game', () => {
        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(0);
      });
    });
  });
});
