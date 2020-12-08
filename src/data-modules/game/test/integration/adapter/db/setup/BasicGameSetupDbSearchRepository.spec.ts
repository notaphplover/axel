import 'reflect-metadata';
import {
  ExtendedGameSetupDb,
  extendedGameSetupDbSchema,
} from '../../../../../adapter/db/model/setup/ExtendedGameSetupDb';
import {
  basicGameSetupFixtureFactory,
  extendedGameSetupFixtureFactory,
} from '../../../../fixtures/domain/model/setup';
import mongoose, { Document, Model } from 'mongoose';
import { BasicGameSetup } from '../../../../../domain/model/setup/BasicGameSetup';
import { BasicGameSetupDbSearchRepository } from '../../../../../adapter/db/repository/setup/BasicGameSetupDbSearchRepository';
import { BasicGameSetupFindQuery } from '../../../../../domain/query/setup/BasicGameSetupFindQuery';
import { Container } from 'inversify';
import { GAME_ADAPTER_TYPES } from '../../../../../adapter/config/types';
import { GAME_DOMAIN_TYPES } from '../../../../../domain/config/types';
import { SearchRepository } from '../../../../../../../layer-modules/db/domain';
import { basicGameSetupFindQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';
import { configAdapter } from '../../../../../../../layer-modules/config/adapter';
import { dbTest } from '../../../../../../../layer-modules/db/test';

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

mongooseIntegrationDescribe(BasicGameSetupDbSearchRepository.name, () => {
  describe('.find()', () => {
    describe('when called and some game setups satisfies the query', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;
      let basicGameSetupFindQueryFixture: BasicGameSetupFindQuery;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'BasicGameSetupDbSearchRepositoryModelSuccess';

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

        const basicGameSetupDbSearchRepository: SearchRepository<
          BasicGameSetup,
          BasicGameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.BASIC_GAME_SETUP_SEARCH_REPOSITORY,
        );

        basicGameSetupFindQueryFixture = basicGameSetupFindQueryFixtureFactory.get();
        basicGameSetupFindQueryFixture.id = extendedGameSetupDbInserted._id.toHexString();

        result = await basicGameSetupDbSearchRepository.find(
          basicGameSetupFindQueryFixture,
        );
      });

      afterAll(async () => {
        await clearCollection(extendedGameSetupModelMock);
      });

      it('must return the game setups', () => {
        const expectedBasicGameSetupResult: BasicGameSetup = basicGameSetupFixtureFactory.get();
        expectedBasicGameSetupResult.id = basicGameSetupFindQueryFixture.id as string;

        expect(result).toHaveProperty('length');
        expect((result as Array<unknown>).length).toBe(1);

        const [gameResult]: unknown[] = result as unknown[];

        expect(gameResult as BasicGameSetup).toEqual(
          expectedBasicGameSetupResult,
        );
      });
    });

    describe('when called and no game setup satisfies the query', () => {
      let extendedGameSetupModelMock: Model<ExtendedGameSetupDb>;

      let result: unknown;

      beforeAll(async () => {
        const collectionName: string =
          'BasicGameSetupDbSearchRepositoryModelFail';

        extendedGameSetupModelMock = createExtendedGameSetupMongooseModelMock(
          collectionName,
        );

        await clearCollection(extendedGameSetupModelMock);

        const childContainer: Container = container.createChild();
        injectGameMongooseModelMock(childContainer, extendedGameSetupModelMock);

        const basicGameSetupDbSearchRepository: SearchRepository<
          BasicGameSetup,
          BasicGameSetupFindQuery
        > = childContainer.get(
          GAME_DOMAIN_TYPES.repository.setup.BASIC_GAME_SETUP_SEARCH_REPOSITORY,
        );

        result = await basicGameSetupDbSearchRepository.find(
          basicGameSetupFindQueryFixtureFactory.get(),
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
