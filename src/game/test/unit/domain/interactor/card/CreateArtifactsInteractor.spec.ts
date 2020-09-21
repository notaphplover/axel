/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../../domain/query/card/ArtifactCreationQuery';
import { CreateArtifactsInteractor } from '../../../../../domain/interactor/card/CreateArtifactsInteractor';
import { InsertRepository } from '../../../../../../layer-modules/db/domain';
import { artifactCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/fixtures';
import { artifactFixtureFactory } from '../../../../fixtures/domain/model/fixtures';

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
