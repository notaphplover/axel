import 'reflect-metadata';
import { CommonDotEnvVariables } from '../../../../adapter/env/CommonDotEnvVariables';
import { EnvLoader } from '../../../../domain/env/EnvLoader';
import { MongooseConector } from '../../../../adapter/db/MongooseConnector';
import { commonDotEnvVariablesFixtureFactory } from '../../../fixtures/adapter/env/commonDotEnvVariables.fixture';

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

      it('must call mongoose connect', () => {
        expect(connect).toHaveBeenCalled();
      });
    });
  });
});
