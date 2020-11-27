import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import * as GameDataActions from './game-data.actions';

export const gameDataFeatureKey = 'gameData';

export enum GameState {
  NOT_ENOUGH_PLAYERS = "NOT_ENOUGH_PLAYERS",
  IN_PROGRESS = "IN_PROGRESS",
  DRAW = "DRAW",
  WIN = "WIN"
}

export enum Symbol {
  X = "X",
  O = "O",
  EMPTY = " "
}

export interface Player {
  symbol: Symbol,
  name: string,
  score: number,
  readyForRematch: boolean
}

export interface Message {
  sender: string,
  message: string,
  timestamp: number
}

export interface State {
  name: string;
  board: Symbol[][];

  players: {
    X?: Player,
    O?: Player
  };

  state: GameState;
  activeSymbol: Symbol;
  messages: Array<Message>;
}

export const initialState: State = {
  name: "",
  board: [[Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY],
          [Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY],
          [Symbol.EMPTY,Symbol.EMPTY,Symbol.EMPTY]],
  players: {},
  state: GameState.NOT_ENOUGH_PLAYERS,
  activeSymbol: Symbol.X,
  messages: []
}

const gameDataReducer = createReducer(
  initialState,
  on(GameDataActions.setGameData, (state, {gameData}) => ({...state, ...gameData})),
  on(GameDataActions.playerJoined, GameDataActions.playerRequestedRematch, GameDataActions.playerWon, (state, {payload}) => {
    let players = Object.assign({}, state.players);
    players[payload.player.symbol] = payload.player;
    return {...state, players};
  }),
  on(GameDataActions.playerLeft, (state, {payload}) => {
    let players = Object.assign({}, state.players);
    delete players[payload.player.symbol];
    return {...state, players};
  }),
  on(GameDataActions.gameStateChanged, (s, {payload}) => ({...s, state: payload.state})),
  on(GameDataActions.activeSymbolChanged, (state, {payload}) => ({...state, activeSymbol: payload.activeSymbol})),
  on(GameDataActions.boardChanged, (state, {payload}) => ({...state, board: payload.board})),
  on(GameDataActions.newMessage, (state, {payload}) => {
    const messages = [...state.messages, payload.message];
    return {...state, messages};
  }),
  on(GameDataActions.clearChat, (state) => ({...state, messages: []}) )
);

export function reducer(state: State | undefined, action: Action) {
  return gameDataReducer(state, action);
}