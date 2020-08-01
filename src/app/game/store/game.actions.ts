import { createAction, props } from '@ngrx/store';

export const loadGame = createAction('LOAD_GAME');

export const setTile = createAction('SET_TILE', props<{x: number, y: number, value: any}>());
export const setBoard = createAction('SET_BOARD', props<{board: Array<Array<any>>}>());

