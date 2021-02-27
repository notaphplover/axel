import 'reflect-metadata';
import { Converter, Interactor } from '../../../../../../../common/domain';
import { EntitiesNotFoundError } from '../../../../../../../layer-modules/db/domain';
import { GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter } from '../../../../../adapter/api/converter/setup/GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter';
import { GameFormatApiV1 } from '../../../../../adapter/api/model/GameFormatApiV1';
import { CardDeck } from '../../../../../domain/model/deck/CardDeck';
import { GameFormat } from '../../../../../domain/model/GameFormat';
import { CardDeckFindQuery } from '../../../../../domain/query/deck/CardDeckFindQuery';
import { GameSetupsCreationQuery } from '../../../../../domain/query/setup/GameSetupCreationQuery';
import { gameSetupCreationQueryApiV1FixtureFactory } from '../../../../fixtures/adapter/api/query/setup';
import { cardDeckFixtureFactory } from '../../../../fixtures/domain/model/deck';
import { gameSetupsCreationQueryFixtureFactory } from '../../../../fixtures/domain/query/setup';

describe(
  GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.name,
  () => {
    let findCardDecksInteractor: Interactor<
      CardDeckFindQuery,
      Promise<CardDeck[]>
    >;
    let gameFormatApiV1ToGameFormatConverter: Converter<
      GameFormatApiV1,
      GameFormat
    >;

    let gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter: GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter;

    beforeAll(() => {
      findCardDecksInteractor = {
        interact: jest.fn(),
      };

      gameFormatApiV1ToGameFormatConverter = {
        transform: jest.fn(),
      };

      gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter = new GameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter(
        findCardDecksInteractor,
        gameFormatApiV1ToGameFormatConverter,
      );
    });

    describe('.transform()', () => {
      describe('when called', () => {
        let result: unknown;

        beforeAll(async () => {
          (findCardDecksInteractor.interact as jest.Mock).mockResolvedValueOnce(
            [cardDeckFixtureFactory.get()],
          );
          (gameFormatApiV1ToGameFormatConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupsCreationQueryFixtureFactory.get().format,
          );

          result = await gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform(
            gameSetupCreationQueryApiV1FixtureFactory.get(),
          );
        });

        afterAll(() => {
          (findCardDecksInteractor.interact as jest.Mock).mockClear();
          (gameFormatApiV1ToGameFormatConverter.transform as jest.Mock).mockClear();
        });

        it('must call findCardDecksInteractor.interact with a gameSetupPlayerSetupsDecksFindQuery', () => {
          const expectedCardDeckFindQuery: CardDeckFindQuery = {
            ids: [cardDeckFixtureFactory.get().id],
          };

          expect(findCardDecksInteractor.interact).toHaveBeenCalledTimes(1);
          expect(findCardDecksInteractor.interact).toHaveBeenCalledWith(
            expectedCardDeckFindQuery,
          );
        });

        it('must return a gameSetupsCreationQuery', () => {
          const expected: GameSetupsCreationQuery = gameSetupsCreationQueryFixtureFactory.get();
          expected.playerSlots = gameSetupCreationQueryApiV1FixtureFactory.get().playerSlots;

          expect(result).toStrictEqual(expected);
        });
      });

      describe('when called, and a card deck is not found', () => {
        let result: unknown;

        beforeAll(async () => {
          (findCardDecksInteractor.interact as jest.Mock).mockResolvedValueOnce(
            [],
          );
          (gameFormatApiV1ToGameFormatConverter.transform as jest.Mock).mockReturnValueOnce(
            gameSetupsCreationQueryFixtureFactory.get().format,
          );

          try {
            result = await gameSetupCreationQueryApiV1ToGameSetupCreationQueryConverter.transform(
              gameSetupCreationQueryApiV1FixtureFactory.get(),
            );
          } catch (err) {
            result = err;
          }
        });

        afterAll(() => {
          (findCardDecksInteractor.interact as jest.Mock).mockClear();
          (gameFormatApiV1ToGameFormatConverter.transform as jest.Mock).mockClear();
        });

        it('must throw an error', () => {
          expect(result).toBeInstanceOf(EntitiesNotFoundError);
        });
      });
    });
  },
);
