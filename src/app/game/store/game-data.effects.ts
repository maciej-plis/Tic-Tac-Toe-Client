import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { GameService } from '../game.service';
import * as GameDataActions from './game-data.actions';
import { Player } from './game-data.reducer';

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
                    gameData.players = this.mapPlayersToObject(gameData.players);
                    return GameDataActions.setGameData({gameData})
                })
            )
        ),
        mergeMap(action => [
            action,
            GameDataActions.subscribeGameChanges()
        ])
    ));

    subscribeGameChangesEffect = createEffect(() => this.actions$.pipe(
        ofType("SUBSCRIBE_GAME_CHANGES"),
        mergeMap(() => this.gameService.subscribeGameEvents())
    ));

    private mapPlayersToObject(players: Player[]): {X?: Player, O?: Player} {
        let playersObject = {};
        
        for(let player of players) {
            playersObject[player.symbol] = player;
        }

        return playersObject;
    }
}