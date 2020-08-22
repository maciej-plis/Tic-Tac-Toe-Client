import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, flatMap, map, mergeMap, tap } from 'rxjs/operators';
import { GameService } from '../../service/game.service';
import * as GameDataActions from '../actions/game-data.actions';

@Injectable()
export class GameDataEffects {

    constructor(
        private actions$: Actions,
        private gameService: GameService
    ) {}

    loadGameDataEffect = createEffect(() =>  this.actions$.pipe(
        ofType("LOAD_GAME_DATA"),
        mergeMap(() => this.gameService.getGameData()
            .pipe(
                map(gameData => {
                    
                    let players = {};
                    for(let player of gameData.players) {
                        players[player.symbol] = player;
                    }
                    gameData.players = players;

                    return GameDataActions.setGameData({gameData})
                })
            )
        ),
        mergeMap(action => [
            action,
            GameDataActions.updateGameData()
        ])
    ));

    updateGameDataEffect = createEffect(() => this.actions$.pipe(
        ofType("UPDATE_GAME_DATA"),
        mergeMap(() => this.gameService.updateGameData()
            .pipe(
                map((gameDataUpdate) => gameDataUpdate)
            )
        )
    ));
}