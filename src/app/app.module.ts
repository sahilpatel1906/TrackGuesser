import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { GameComponent } from './game/game.component';
import { TestComponent } from './components/test/test.component';
import { GameBarComponent } from "./components/game-bar/game-bar.component";
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { HintZoneComponent } from './components/hint-zone/hint-zone.component';
import { ResultsComponent } from './results/results.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerComponent } from './components/player/player.component';
import { HelpComponent } from './components/help/help.component';
import { GuesserComponent } from './components/guesser/guesser.component';
import { GuessBarComponent } from './components/guess-bar/guess-bar.component';


const routes: Routes = [{ path: "", component: HomeComponent },{ path: "game", component: GameComponent },{ path: "results", component: ResultsComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent, TestComponent, LeaderboardComponent, HintZoneComponent, ResultsComponent, NavbarComponent, HelpComponent, PlayerComponent, GuesserComponent, GuessBarComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), GameBarComponent, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
