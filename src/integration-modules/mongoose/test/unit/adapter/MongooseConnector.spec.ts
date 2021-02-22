import 'reflect-metadata';

jest.mock('mongoose');
import { connect } from 'mongoose';

import { DbDotEnvVariables } from '../../../../../layer-modules/db/adapter/env/DbDotEnvVariables';
import { dbDotEnvVariablesFixtureFactory } from '../../../../../layer-modules/db/test/fixtures/adapter/env/fixtures';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongooseConnector } from '../../../adapter/MongooseConnector';

describe(MongooseConnector.name, () => {
  let commonEnvLoader: EnvLoader<DbDotEnvVariables>;
  let mongooseConnector: MongooseConnector;

  beforeAll(() => {
    commonEnvLoader = {
      index: dbDotEnvVariablesFixtureFactory.get(),
      load: jest.fn(),
    };
    mongooseConnector = new MongooseConnector(commonEnvLoader);
  });

  describe(`.${MongooseConnector.prototype.connect.name}`, () => {
    describe('when called', () => {
      beforeAll(async () => {
        await mongooseConnector.connect();
      });

      it(`must call mongoose.${connect.name}()`, () => {
        expect(connect).toHaveBeenCalledTimes(1);
      });
    });
  });
});
