import { GAME_ADAPTER_PUBLIC_TYPES } from './config/types';
import { gameContainer } from './config/container';

// eslint-disable-next-line @typescript-eslint/typedef
export const gameAdapter = {
  config: {
    container: gameContainer,
    types: GAME_ADAPTER_PUBLIC_TYPES,
  },
};
