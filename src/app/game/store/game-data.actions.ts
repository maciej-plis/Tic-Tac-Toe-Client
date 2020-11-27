import { createAction, props } from '@ngrx/store';
import { GameState, Message, Player, State, Symbol } from './game-data.reducer';

export const loadGameData = createAction('LOAD_GAME_DATA');
export const subscribeGameChanges = createAction('SUBSCRIBE_GAME_CHANGES');
export const setGameData = createAction('SET_GAME_DATA',
  props<{gameData: State}>());
export const playerJoined = createAction('PLAYER_JOINED',
  props<{payload: {player: Player}}>());
export const playerLeft = createAction('PLAYER_LEFT',
  props<{payload: {player: Player}}>());
export const gameStateChanged = createAction('GAME_STATE_CHANGED',
  props<{payload: {state: GameState}}>());
export const activeSymbolChanged = createAction('ACTIVE_SYMBOL_CHANGED',
  props<{payload: {activeSymbol: Symbol}}>());
export const boardChanged = createAction('BOARD_CHANGED',
  props<{payload: {board: Symbol[][]}}>());
export const playerRequestedRematch = createAction('PLAYER_REQUESTED_REMATCH',
  props<{payload: {player: Player}}>());
export const playerWon = createAction('PLAYER_WON',
  props<{payload: {player: Player}}>());
export const newMessage = createAction('NEW_MESSAGE',
  props<{payload: {message: Message}}>());
export const clearChat = createAction('CLEAR_CHAT',
  props<{payload: {}}>());