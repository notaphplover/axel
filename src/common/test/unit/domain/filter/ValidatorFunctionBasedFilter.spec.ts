import 'reflect-metadata';
import { ValidatorFunctionBasedFilter } from '../../../../domain';

interface TModelMock {
  foo: string;
}

type TQueryMock = TModelMock;

class ValidatorFunctionBasedFilterMock extends ValidatorFunctionBasedFilter<
  TModelMock,
  TQueryMock
> {
  constructor(
    private readonly validatorFunction: (
      model: TModelMock,
      query: TQueryMock,
    ) => Promise<boolean>,
  ) {
    super();
  }

  protected async complains(
    model: TModelMock,
    query: TQueryMock,
  ): Promise<boolean> {
    return this.validatorFunction(model, query);
  }
}

const modelFixture: TModelMock = { foo: 'bar' };
const queryFixture: TQueryMock = { foo: 'bar' };

describe(ValidatorFunctionBasedFilter.name, () => {
  let validatorFunction: ((
    model: TModelMock,
    query: TQueryMock,
  ) => Promise<boolean>) &
    jest.Mock;

  let validatorFunctionBasedFilter: ValidatorFunctionBasedFilterMock;

  beforeAll(() => {
    validatorFunction = jest.fn();

    validatorFunctionBasedFilter = new ValidatorFunctionBasedFilterMock(
      validatorFunction,
    );
  });

  describe('.find()', () => {
    describe('when called, and validator validates all the models', () => {
      let result: unknown;

      beforeAll(async () => {
        validatorFunction.mockResolvedValueOnce(true);

        result = await validatorFunctionBasedFilter.filter(
          [modelFixture],
          queryFixture,
        );
      });

      afterAll(() => {
        validatorFunction.mockClear();
      });

      it('must return all the models', () => {
        expect(result).toStrictEqual([modelFixture]);
      });
    });

    describe('when called, and validator validates no models', () => {
      let result: unknown;

      beforeAll(async () => {
        validatorFunction.mockResolvedValueOnce(false);

        result = await validatorFunctionBasedFilter.filter(
          [modelFixture],
          queryFixture,
        );
      });

      afterAll(() => {
        validatorFunction.mockClear();
      });

      it('must return no models', () => {
        expect(result).toStrictEqual([]);
      });
    });
  });

  describe('.findOne()', () => {
    describe('when called, and validator validates the model', () => {
      describe('when called, and validator validates all the models', () => {
        let result: unknown;

        beforeAll(async () => {
          validatorFunction.mockResolvedValueOnce(true);

          result = await validatorFunctionBasedFilter.filterOne(
            modelFixture,
            queryFixture,
          );
        });

        afterAll(() => {
          validatorFunction.mockClear();
        });

        it('must return all the models', () => {
          expect(result).toStrictEqual(modelFixture);
        });
      });
    });

    describe('when called, and validator does not validates the model', () => {
      let result: unknown;

      beforeAll(async () => {
        validatorFunction.mockResolvedValueOnce(false);

        result = await validatorFunctionBasedFilter.filterOne(
          modelFixture,
          queryFixture,
        );
      });

      afterAll(() => {
        validatorFunction.mockClear();
      });

      it('must return null', () => {
        expect(result).toBeNull();
      });
    });
  });
});
