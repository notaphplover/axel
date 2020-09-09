import 'reflect-metadata';
import { CommonDotEnvVariables } from '../../../adapter/env/DbDotEnvVariables';
import { EnvLoader } from '../../../../env/domain';
import { MongooseConector } from '../../../adapter/MongooseConnector';
import { commonDotEnvVariablesFixtureFactory } from '../../fixtures/adapter/env/commonDotEnvVariables.fixture';

jest.mock('mongoose');
import { connect } from 'mongoose';

describe(MongooseConector.name, () => {
  let commonEnvLoader: EnvLoader<CommonDotEnvVariables>;
  let mongooseConnector: MongooseConector;

  beforeAll(() => {
    commonEnvLoader = {
      index: commonDotEnvVariablesFixtureFactory.get(),
      load: jest.fn(),
    };
    mongooseConnector = new MongooseConector(commonEnvLoader);
  });

  describe(`.${MongooseConector.prototype.connect.name}`, () => {
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
