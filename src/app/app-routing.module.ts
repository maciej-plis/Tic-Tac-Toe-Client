import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { JoinComponent } from './join/join.component';


const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'join', component: JoinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
