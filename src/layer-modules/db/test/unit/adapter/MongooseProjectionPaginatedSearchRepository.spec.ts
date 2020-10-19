/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Converter, PaginationQuery } from '../../../../../common/domain';
import { Document, DocumentQuery, FilterQuery, Model } from 'mongoose';
import { MongooseProjectionPaginatedSearchRepository } from '../../../adapter/MongooseProjectionPaginatedSearchRepository';

class ModelMock {
  constructor(public foo: string) {}
}

class QueryMock implements PaginationQuery {
  constructor(
    public readonly foo: string,
    public readonly limit?: number,
    public readonly offset?: number,
  ) {}
}

type ModelMockDb = ModelMock & Document;

class MongooseProjectionSearchRepositoryMock extends MongooseProjectionPaginatedSearchRepository<
  ModelMock,
  ModelMockDb,
  ModelMockDb,
  QueryMock
> {}

const FOO_VALUE: string = 'bar';

const modelMockFixture: ModelMock = { foo: FOO_VALUE };
const modelMockDbFixture: ModelMockDb = { foo: FOO_VALUE } as ModelMockDb;
const queryMockFixture: QueryMock = new QueryMock(FOO_VALUE, 10, 20);
const queryMockDbFixture: FilterQuery<ModelMockDb> = { foo: FOO_VALUE };

describe(MongooseProjectionPaginatedSearchRepository.name, () => {
  let modelMock: Model<ModelMockDb>;
  let modelDbToModelConverter: Converter<
    ModelMock,
    ModelMockDb | Promise<ModelMockDb>
  >;
  let queryToFilterQueryConverter: Converter<
    QueryMock,
    FilterQuery<ModelMockDb> | Promise<FilterQuery<ModelMockDb>>
  >;
  let nullPostSearchFilter: null;

  let nullProjectionFixture: null;

  let mongooseProjectionPaginatedSearchRepository: MongooseProjectionSearchRepositoryMock;

  beforeAll(() => {
    modelMock = ({
      find: jest.fn(),
    } as Partial<Model<ModelMockDb>>) as Model<ModelMockDb>;
    modelDbToModelConverter = {
      transform: jest.fn(),
    };
    queryToFilterQueryConverter = { transform: jest.fn() };
    nullPostSearchFilter = null;
    nullProjectionFixture = null;

    mongooseProjectionPaginatedSearchRepository = new MongooseProjectionSearchRepositoryMock(
      modelMock,
      modelDbToModelConverter,
      queryToFilterQueryConverter,
      nullPostSearchFilter,
      nullProjectionFixture,
    );
  });

  describe('.find()', () => {
    let findDocumentQueryMock: DocumentQuery<ModelMockDb[], ModelMockDb>;

    beforeAll(() => {
      findDocumentQueryMock = ({
        limit: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        then: jest.fn(),
      } as Partial<DocumentQuery<ModelMockDb[], ModelMockDb>>) as DocumentQuery<
        ModelMockDb[],
        ModelMockDb
      >;
      (modelMock.find as jest.Mock).mockImplementationOnce(
        () => findDocumentQueryMock,
      );
    });

    afterAll(() => {
      (modelMock.find as jest.Mock).mockClear();
    });

    describe('when called', () => {
      beforeAll(async () => {
        (findDocumentQueryMock.then as jest.Mock).mockImplementationOnce(
          (onFullfiled: (value: ModelMockDb[]) => void) => {
            onFullfiled([modelMockDbFixture]);
          },
        );
        (modelDbToModelConverter.transform as jest.Mock).mockReturnValueOnce(
          modelMockFixture,
        );
        (queryToFilterQueryConverter.transform as jest.Mock).mockReturnValueOnce(
          queryMockDbFixture,
        );

        await mongooseProjectionPaginatedSearchRepository.find(
          queryMockFixture,
        );
      });

      it('must call documentQuery.limit with the limit provided', () => {
        expect(findDocumentQueryMock.limit).toHaveBeenCalledTimes(1);
        expect(findDocumentQueryMock.limit).toHaveBeenCalledWith(
          queryMockFixture.limit,
        );
      });

      it('must call documentQuery.skip with the offset provided', () => {
        expect(findDocumentQueryMock.skip).toHaveBeenCalledTimes(1);
        expect(findDocumentQueryMock.skip).toHaveBeenCalledWith(
          queryMockFixture.offset,
        );
      });
    });
  });
});
