import { gameContainer } from './config/container';
import { GAME_ADAPTER_PUBLIC_TYPES } from './config/types';

// eslint-disable-next-line @typescript-eslint/typedef
export const gameAdapter = {
  config: {
    container: gameContainer,
    types: GAME_ADAPTER_PUBLIC_TYPES,
  },
};
