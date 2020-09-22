/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import {
  artifactCreationQueryFixtureFactory,
  creatureCreationQueryFixtureFactory,
  enchantmentCreationQueryFixtureFactory,
  landCreationQueryFixtureFactory,
} from '../../../../fixtures/domain/query/fixtures';
import {
  artifactFixtureFactory,
  creatureFixtureFactory,
  enchantmentFixtureFactory,
  landFixtureFactory,
} from '../../../../fixtures/domain/model/fixtures';
import { Artifact } from '../../../../../domain/model/card/Artifact';
import { ArtifactCreationQuery } from '../../../../../domain/query/card/ArtifactCreationQuery';
import { CardCreationQuery } from '../../../../../domain/query/card/CardCreationQuery';
import { CardType } from '../../../../../domain/model/card/CardType';
import { CreateCardsInteractor } from '../../../../../domain/interactor/card/CreateCardsInteractor';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CreatureCreationQuery } from '../../../../../domain/query/card/CreatureCreationQuery';
import { Enchantment } from '../../../../../domain/model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../../../../domain/query/card/EnchantmentCreationQuery';
import { Interactor } from '../../../../../../common/domain';
import { Land } from '../../../../../domain/model/card/Land';
import { LandCreationQuery } from '../../../../../domain/query/card/LandCreationQuery';

describe(CreateCardsInteractor.name, () => {
  let createArtifactsInteractor: Interactor<
    ArtifactCreationQuery,
    Promise<Artifact[]>
  >;
  let createCreaturesInteractor: Interactor<
    CreatureCreationQuery,
    Promise<Creature[]>
  >;
  let createEnchantmentsInteractor: Interactor<
    EnchantmentCreationQuery,
    Promise<Enchantment[]>
  >;
  let createLandsInteractor: Interactor<LandCreationQuery, Promise<Land[]>>;

  let createCardsInteractor: CreateCardsInteractor;

  beforeAll(() => {
    createArtifactsInteractor = {
      interact: jest.fn(),
    };
    createCreaturesInteractor = {
      interact: jest.fn(),
    };
    createEnchantmentsInteractor = {
      interact: jest.fn(),
    };
    createLandsInteractor = {
      interact: jest.fn(),
    };

    createCardsInteractor = new CreateCardsInteractor(
      createArtifactsInteractor,
      createCreaturesInteractor,
      createEnchantmentsInteractor,
      createLandsInteractor,
    );
  });

  describe('.interact()', () => {
    describe('when called, with an ArtifactCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        (createArtifactsInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [artifactFixtureFactory.get()],
        );

        result = await createCardsInteractor.interact(
          artifactCreationQueryFixtureFactory.get(),
        );
      });

      it('must call createArtifactsInteractor.interact', () => {
        expect(createArtifactsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createArtifactsInteractor.interact).toHaveBeenCalledWith(
          artifactCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the artifacts found by createArtifactsInteractor', () => {
        expect(result).toStrictEqual([artifactFixtureFactory.get()]);
      });
    });

    describe('when called, with an CreatureCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        (createCreaturesInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [creatureFixtureFactory.get()],
        );

        result = await createCardsInteractor.interact(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must call createCreaturesInteractor.interact', () => {
        expect(createCreaturesInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createCreaturesInteractor.interact).toHaveBeenCalledWith(
          creatureCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the creatures found by createCreaturesInteractor', () => {
        expect(result).toStrictEqual([creatureFixtureFactory.get()]);
      });
    });

    describe('when called, with an EnchantmentCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        (createEnchantmentsInteractor.interact as jest.Mock).mockResolvedValueOnce(
          [enchantmentFixtureFactory.get()],
        );

        result = await createCardsInteractor.interact(
          enchantmentCreationQueryFixtureFactory.get(),
        );
      });

      it('must call createEnchantmentsInteractor.interact', () => {
        expect(createEnchantmentsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createEnchantmentsInteractor.interact).toHaveBeenCalledWith(
          enchantmentCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the enchantments found by createEnchantmentsInteractor', () => {
        expect(result).toStrictEqual([enchantmentFixtureFactory.get()]);
      });
    });

    describe('when called, with an LandCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        (createLandsInteractor.interact as jest.Mock).mockResolvedValueOnce([
          landFixtureFactory.get(),
        ]);

        result = await createCardsInteractor.interact(
          landCreationQueryFixtureFactory.get(),
        );
      });

      it('must call createLandsInteractor.interact', () => {
        expect(createLandsInteractor.interact).toHaveBeenCalledTimes(1);
        expect(createLandsInteractor.interact).toHaveBeenCalledWith(
          landCreationQueryFixtureFactory.get(),
        );
      });

      it('must return the lands found by createLandsInteractor', () => {
        expect(result).toStrictEqual([landFixtureFactory.get()]);
      });
    });

    describe('when called, with a different CardCreationQuery', () => {
      let result: unknown;

      beforeAll(async () => {
        try {
          result = await createCardsInteractor.interact({
            cost: {
              black: 0,
              blue: 1,
              green: 2,
              red: 3,
              uncolored: 4,
              white: 5,
            },
            type: 'CreateCardsInteractor test wrong card type' as CardType,
          } as CardCreationQuery);
        } catch (err) {
          result = err;
        }
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toStrictEqual(
          expect.stringContaining('nexpected card type'),
        );
      });
    });
  });
});
