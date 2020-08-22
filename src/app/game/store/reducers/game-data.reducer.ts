import {
  Action,
  createReducer,
  on
} from '@ngrx/store';

import * as GameDataActions from '../actions/game-data.actions';

export const gameDataFeatureKey = 'gameData';

export enum GameStatus {
  NOT_ENOUGH_PLAYERS = "Waiting for more players",
  IN_PROGRESS = "Player %s is moving",
  DRAW = "Game tied",
  WIN = "%s Wins"
}

export enum Symbol {
  X = "X",
  O = "O",
  EMPTY = " "
}

export interface Player {
  symbol: Symbol,
  name: string,
  isReady: boolean
}

export interface State {
  board: Symbol[][];

  players: {
    X?: Player,
    O?: Player
  };

  status: GameStatus;
  activeSymbol: Symbol;
}

export const initialState: State = {
  board: [[Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY],
          [Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY],
          [Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY]],
  players: {},
  status: GameStatus.NOT_ENOUGH_PLAYERS,
  activeSymbol: Symbol.X
}

const gameDataReducer = createReducer(
  initialState,
  on(GameDataActions.setGameData, (state, {gameData}) => gameData),
  on(GameDataActions.playerJoined, (state, {player}) => {
    let players = Object.assign({}, state.players);
    players[player.symbol] = player;
    return {...state, players};
  }),
  on(GameDataActions.playerLeft, (state, {player}) => {
    let players = Object.assign({}, state.players);
    delete players[player.symbol];
    return {...state, players};
  }),
  on(GameDataActions.gameStatusChanged, (state, {status}) => ({...state, status})),
  on(GameDataActions.activeSymbolChanged, (state, {activeSymbol}) => ({...state, activeSymbol})),
  on(GameDataActions.boardChanged, (state, {board}) => ({...state, board})),
);

export function reducer(state: State | undefined, action: Action) {
  return gameDataReducer(state, action);
}