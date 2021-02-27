import 'reflect-metadata';
import { InsertRepository } from '../../../../../../../layer-modules/db/domain';
import { CreateArtifactsInteractor } from '../../../../../domain/interactor/card/CreateArtifactsInteractor';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../../domain/query/card/ArtifactCreationQuery';
import { artifactFixtureFactory } from '../../../../fixtures/domain/model/card';
import { artifactCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(CreateArtifactsInteractor.name, () => {
  let artifactInsertRepository: InsertRepository<
    Artifact,
    ArtifactCreationQuery
  >;

  let createArtifactsInteractor: CreateArtifactsInteractor;

  beforeAll(() => {
    artifactInsertRepository = {
      insert: jest.fn(),
    };

    createArtifactsInteractor = new CreateArtifactsInteractor(
      artifactInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (artifactInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          artifactFixtureFactory.get(),
        ]);

        result = await createArtifactsInteractor.interact(
          artifactCreationQueryFixtureFactory.get(),
        );
      });

      it('must call artifactInsertRespository.insert', () => {
        expect(artifactInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(artifactInsertRepository.insert).toHaveBeenCalledWith(
          artifactCreationQueryFixtureFactory.get(),
        );
      });

      it('must return artifactInsertRespository.insert results', () => {
        expect(result).toStrictEqual([artifactFixtureFactory.get()]);
      });
    });
  });
});
