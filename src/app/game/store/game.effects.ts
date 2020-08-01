import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { setBoard } from './game.actions';

@Injectable()
export class GameEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}

    loadRoomList$ = createEffect(() => this.actions$.pipe(
        ofType('LOAD_GAME'),
        mergeMap(() => this.http.get("http://localhost:8080/board")
            .pipe(
                tap(resp => console.log(resp)),
                map(resp => setBoard({board: resp}))
            )
        )
    ));

    
}