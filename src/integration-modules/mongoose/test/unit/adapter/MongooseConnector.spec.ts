import 'reflect-metadata';
import { DbDotEnvVariables } from '../../../../../layer-modules/db/adapter/env/DbDotEnvVariables';
import { EnvLoader } from '../../../../../layer-modules/env/domain';
import { MongooseConnector } from '../../../adapter/MongooseConnector';
import { commonDotEnvVariablesFixtureFactory } from '../../../../../layer-modules/db/test/fixtures/adapter/env/fixtures';

jest.mock('mongoose');
import { connect } from 'mongoose';

describe(MongooseConnector.name, () => {
  let commonEnvLoader: EnvLoader<DbDotEnvVariables>;
  let mongooseConnector: MongooseConnector;

  beforeAll(() => {
    commonEnvLoader = {
      index: commonDotEnvVariablesFixtureFactory.get(),
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
