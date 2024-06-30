import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/services/localStorage';
import GameState from 'src/types/GameState';
import LeaderboardScore from 'src/types/LeaderboardScore';
import Track from 'src/types/Track';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  leaderboard: LeaderboardScore[] | null = null;

  gameState: GameState|null = {
    score: 0,
    mode: 'easy',
    round: 0,
    tracks: [],
    roundState: {
      artistGuessed: false,
      artistHint: false,
      albumHint: false,
      titleHint: false,
      ended: false,
      songGuesses: 0,
      artistGuessComplete: false,
      titleGuessed: false
    },
    autofillTitles: []
  }

  tracks: Track[]|null = 
  [
    {
      href: '1',
      previewUrl: "string",
      artist: ["helloImArtist"],
      album: "Album",
      albumArt: "ImgURL",
      title: "Title",
    },
    {
      href: '2',
      previewUrl: "string1",
      artist: ["helloImArtist1"],
      album: "Album1",
      albumArt: "ImgURL1",
      title: "Title1",
    },
    {
      href: '3',
      previewUrl: "string2",
      artist: ["helloImArtist2"],
      album: "Album2",
      albumArt: "ImgURL2",
      title: "Title2",
    }
  ]

  constructor(private storageService: StorageService, private router : Router) {
    const incomingState = <GameState|null>storageService.retrieve('game-state');
    const leaderboardStored = <LeaderboardScore[]|null>storageService.retrieve('leaderboard');
    if(!incomingState) {
      router.navigateByUrl('/')
    } else if (incomingState.round < 6) {
      router.navigateByUrl('/game')
    } else {
      this.gameState = incomingState;
      this.tracks = this.gameState.tracks;
    }
    if(!leaderboardStored) {
      router.navigateByUrl('/')
    } else {
      this.leaderboard = leaderboardStored;
    }
  }

  ngOnInit(): void {
  }

  rankUserForm: FormGroup = new FormGroup({
    username: new FormControl<string>("", [Validators.required, Validators.minLength(3)])
  })

  saveUsername(username : string) {
    if(this.gameState?.mode !== undefined && this.gameState?.score !== undefined){
      const scoreToAdd : LeaderboardScore= {name: username, mode: this.gameState.mode, score: this.gameState.score};
      this.leaderboard?.push(scoreToAdd);
      this.storageService.save('leaderboard',this.leaderboard);
      alert("Congratulations, your score was saved!");
    }
  }

  navigateHome(){
    this.router.navigateByUrl('/')
  }

}
