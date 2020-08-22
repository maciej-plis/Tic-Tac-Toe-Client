import { createAction, props } from '@ngrx/store';
import { Player, Symbol } from '../reducers/game-data.reducer'; 
import { GameStatus } from '../reducers/game-data.reducer';
import { State } from '../reducers/game-data.reducer';

export const loadGameData = createAction(
  'LOAD_GAME_DATA'
)

export const updateGameData = createAction(
  'UPDATE_GAME_DATA'
)

export const setGameData = createAction(
  'SET_GAME_DATA',
  props<{ gameData: State }>()
)

export const playerJoined = createAction(
  'PLAYER_JOINED',
  props<{ player: Player }>()
);

export const playerLeft = createAction(
  'PLAYER_LEFT',
  props<{ player: Player }>()
);

export const gameStatusChanged = createAction(
  'GAME_STATUS_CHANGED',
  props<{ status: GameStatus }>()
);

export const activeSymbolChanged = createAction(
  'ACTIVE_SYMBOL_CHANGED',
  props<{ activeSymbol: Symbol }>()
);

export const boardChanged = createAction(
  'BOARD_CHANGED',
  props<{ board: Symbol[][] }>()
);