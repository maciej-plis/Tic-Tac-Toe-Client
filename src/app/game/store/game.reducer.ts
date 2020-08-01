import { Action, createReducer, on } from '@ngrx/store'
import { loadGame, setBoard, setTile } from './game.actions'

export interface state {
    board: Array<Array<any>>,
}

const initialState: state = {
    board: [['','',''],['','',''],['','','']],
}

const reducer = createReducer(
    initialState,
    on(setBoard, (state, {board}) => {
        console.log("SET_BOARD")
        
        return {board};
    }),
    on(setTile, (state: state, {x, y, value}) => {
        console.log("SET_TILE")

        const board = JSON.parse(JSON.stringify(state.board));

        board[x][y] = value;

        return {board};
    })
)

export function gameReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}