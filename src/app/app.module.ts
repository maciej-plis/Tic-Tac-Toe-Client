import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { JoinModule } from './join/join.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    JoinModule,
    GameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
