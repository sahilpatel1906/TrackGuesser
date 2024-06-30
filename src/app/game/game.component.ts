import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/localStorage';
import GameState from 'src/types/GameState';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameState: GameState|null = {
    score: 0,
    mode: 'normal',
    round: 1,
    autofillTitles: [],
    tracks: [{
      href: '123',
      title: 'Ocean Man',
      previewUrl: 'https://p.scdn.co/mp3-preview/ffdf09225ab7d6a8cf2967b12f8f99b640bce365?cid=74f434552d40467782bc1bc64b12b2e9',
      artist: ['Ween', 'Ween2'],
      albumArt: 'https://avatars.githubusercontent.com/u/17057173?v=4',
      album: 'Ocean Adventure'
    },
    {
      href: '1233',
      title: 'Ocean Man1',
      previewUrl: 'https://p.scdn.co/mp3-preview/ffdf09225ab7d6a8cf2967b12f8f99b640bce365?cid=74f434552d40467782bc1bc64b12b2e9',
      artist: ['Ween', 'Weene2'],
      albumArt: 'https://avatars.githubusercontent.com/u/17057173?v=4',
      album: 'Ocean Adventure'
    }],
    roundState: {
      artistGuessed: false,
      artistHint: false,
      albumHint: false,
      titleHint: false,
      songGuesses: 0,
      artistGuessComplete: false,
      titleGuessed: false,
      ended: false
    }
  }

  constructor(private storageService: StorageService, private router: Router) {
    const incomingState = <GameState|null>storageService.retrieve('game-state');
    if(!incomingState) {
      router.navigateByUrl('/')
    } else {
      this.gameState = incomingState
    }
  }

  ngOnInit(): void {
  }

  updateRootState(state: GameState) {
    this.gameState = state;
    this.storageService.save('game-state',state);
  }

}
