import 'reflect-metadata';
import { Interactor } from '../../../../../../../common/domain';
import { CreateCardsInteractor } from '../../../../../domain/interactor/card/CreateCardsInteractor';
import { CardType } from '../../../../../domain/model/card/CardType';
import { Creature } from '../../../../../domain/model/card/Creature';
import { CardCreationQuery } from '../../../../../domain/query/card/CardCreationQuery';
import { CreatureCreationQuery } from '../../../../../domain/query/card/CreatureCreationQuery';
import { creatureFixtureFactory } from '../../../../fixtures/domain/model/card';
import { creatureCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/card';

describe(CreateCardsInteractor.name, () => {
  let createCreaturesInteractor: Interactor<
    CreatureCreationQuery,
    Promise<Creature[]>
  >;

  let createCardsInteractor: CreateCardsInteractor;

  beforeAll(() => {
    createCreaturesInteractor = {
      interact: jest.fn(),
    };

    createCardsInteractor = new CreateCardsInteractor(
      createCreaturesInteractor,
    );
  });

  describe('.interact()', () => {
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
