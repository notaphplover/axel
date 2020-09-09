/* eslint-disable @typescript-eslint/unbound-method */
import 'reflect-metadata';
import { Game, NoIdGame } from '../../../../domain/model/Game';
import {
  gameFixtureFactory,
  noIdGameFixtureFactory,
} from '../../../fixtures/domain/model/fixtures';
import { Converter } from '../../../../../common/domain';
import { CreateGamesInteractor } from '../../../../domain/interactor/CreateGamesInteractor';
import { GameCreationQuery } from '../../../../domain/query/GameCreationQuery';
import { InsertRepository } from '../../../../../layer-modules/db/domain';
import { gameCreationQueryFixtureFactory } from '../../../fixtures/domain/query/fixtures';

describe(CreateGamesInteractor.name, () => {
  let gameCreationqueryToNoIdGamesConverter: Converter<
    GameCreationQuery,
    NoIdGame[]
  >;
  let gameInsertRepository: InsertRepository<NoIdGame, Game>;

  let createGamesInteractor: CreateGamesInteractor;

  beforeAll(() => {
    gameCreationqueryToNoIdGamesConverter = {
      transform: jest.fn(),
    };
    gameInsertRepository = ({
      insert: jest.fn(),
    } as Partial<InsertRepository<NoIdGame, Game>>) as InsertRepository<
      NoIdGame,
      Game
    >;

    createGamesInteractor = new CreateGamesInteractor(
      gameCreationqueryToNoIdGamesConverter,
      gameInsertRepository,
    );
  });

  describe('.interact()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (gameCreationqueryToNoIdGamesConverter.transform as jest.Mock).mockReturnValueOnce(
          [noIdGameFixtureFactory.get()],
        );

        (gameInsertRepository.insert as jest.Mock).mockResolvedValueOnce([
          gameFixtureFactory.get(),
        ]);

        result = await createGamesInteractor.interact(
          gameCreationQueryFixtureFactory.get(),
        );
      });

      it('must call gameCreationqueryToNoIdGamesConverter.transform() with the query provided', () => {
        expect(
          gameCreationqueryToNoIdGamesConverter.transform,
        ).toHaveBeenCalledTimes(1);
        expect(
          gameCreationqueryToNoIdGamesConverter.transform,
        ).toHaveBeenCalledWith(gameCreationQueryFixtureFactory.get());
      });

      it('must call gameInsertRepository.insert() with the games obtained from the converter', () => {
        expect(gameInsertRepository.insert).toHaveBeenCalledTimes(1);
        expect(gameInsertRepository.insert).toHaveBeenCalledWith([
          noIdGameFixtureFactory.get(),
        ]);
      });

      it('must return the game created', () => {
        expect(result).toStrictEqual([gameFixtureFactory.get()]);
      });
    });
  });
});
