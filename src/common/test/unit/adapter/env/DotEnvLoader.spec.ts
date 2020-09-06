import 'reflect-metadata';
import { DotEnvLoader } from '../../../../adapter/env/DotEnvLoader';
import { Index } from '../../../../domain/env/EnvLoader';

jest.mock('dotenv');
import dotenv from 'dotenv';

interface MockType {
  foo: string;
}

const indexFixture: Index<MockType> = { foo: 'bar' };

class DotEnvLoaderMock extends DotEnvLoader<MockType> {
  protected parseIndex(): Index<MockType> {
    return indexFixture;
  }
}

describe(DotEnvLoader.name, () => {
  let fixturePath: string;

  beforeAll(() => {
    fixturePath = 'bar';
  });

  describe('.index', () => {
    describe('when called', () => {
      let dotEnvLoader: DotEnvLoader<MockType>;
      let result: unknown;

      beforeAll(() => {
        dotEnvLoader = new DotEnvLoaderMock(fixturePath);
        result = dotEnvLoader.index;
      });

      it('must return its innerIndex', () => {
        expect(result).toStrictEqual(indexFixture);
      });
    });

    describe('when called, and innerIndex is not defined', () => {
      let dotEnvLoader: DotEnvLoader<MockType>;
      let dotEnvLoaderLoadSpy: jest.SpyInstance;

      beforeAll(() => {
        dotEnvLoader = new DotEnvLoaderMock(fixturePath);
        dotEnvLoaderLoadSpy = jest.spyOn(dotEnvLoader, 'load');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        dotEnvLoader.index;
      });

      it('must call this.load', () => {
        expect(dotEnvLoaderLoadSpy).toHaveBeenCalledTimes(1);
      });

      afterAll(() => {
        dotEnvLoaderLoadSpy.mockClear();
      });
    });
  });

  describe('.load', () => {
    let dotEnvLoader: DotEnvLoader<MockType>;

    beforeAll(() => {
      dotEnvLoader = new DotEnvLoaderMock(fixturePath);
    });

    describe('when called', () => {
      beforeAll(() => {
        (dotenv.config as jest.Mock).mockClear();
        dotEnvLoader.load();
      });

      it('must call dontenv.config', () => {
        expect(dotenv.config).toHaveBeenCalledTimes(1);
      });
    });
  });
});
