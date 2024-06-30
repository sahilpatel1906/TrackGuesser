import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import GameState from 'src/types/GameState';
import RoundState from 'src/types/RoundState';
import Track from 'src/types/Track';

@Component({
  selector: 'app-guesser',
  templateUrl: './guesser.component.html',
  styleUrls: ['./guesser.component.css']
})
export class GuesserComponent implements OnInit {

  @Input() gameState: GameState | null = null;

  @Output() updateState = new EventEmitter<GameState>();

  showAutofill: boolean = false;
  filteredTracks : Track[] = [];

  roundScore : number = 0;

  nextRoundExists : boolean = true;

  resetRound: RoundState = {
    artistGuessed: false,
    artistHint: false,
    albumHint: false,
    titleHint: false,
    songGuesses: 0,
    artistGuessComplete: false,
    titleGuessed: false,
    ended: false
  }
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  guessArtistForm: FormGroup = new FormGroup({
    artist: new FormControl<string>("")
  })

  guessTrackForm: FormGroup = new FormGroup({
    track: new FormControl<string>("")
  })

  delayedShow(show: boolean) {
    setTimeout(()=>{
      this.showAutofill = show
    },500)
  }

  calculateScore(){
    if(this.gameState){
      let wrongGuessPenalty = this.gameState.roundState.songGuesses;  
      this.roundScore = 1000 + (this.gameState.roundState.albumHint ? -100 : 0) + (this.gameState.roundState.artistHint ? -200 : 0) + (this.gameState.roundState.titleHint ? -100 : 0) + (wrongGuessPenalty * -100) + (this.gameState.roundState.artistGuessed ? 100 : 0);
    }
    return this.roundScore;
  }

  skipArtistGuess(){
    if(this.gameState){
      this.gameState.roundState.artistGuessComplete = true;
      this.updateState.emit(this.gameState);
    }
  }

  submitArtistGuess(artist : string){
    if(this.gameState){
      for (let singleArtist of this.gameState.tracks[this.gameState.round - 1].artist){
        if(singleArtist.toLowerCase() == artist.toLowerCase()) {
          this.gameState.roundState.artistGuessed = true;
        }
      }
      this.gameState.roundState.artistGuessComplete = true;
      this.guessArtistForm.get('artist')?.setValue('');
      this.updateState.emit(this.gameState);
    }
  }

  getPlaceholder(){
    return `Guess The Track   +${this.calculateScore()}`
  }

  filterTracks(event: any){
    if(event !== ""){
      if(this.gameState){
        let tracks = this.gameState.tracks;
        this.filteredTracks = tracks.filter((track)=> {
          return track.title.toLowerCase().includes(event.toLowerCase())
        })
      }
    } else {
      this.filteredTracks = [];
    }
  }

  skipTrackGuess(){
    if(this.gameState){
      this.gameState.roundState.songGuesses += 1;
      this.updateState.emit(this.gameState);
    }
  }

  submitTrackGuess(guess: string){
    if(this.gameState){
      if(this.gameState.tracks[this.gameState.round - 1].title == guess){
        this.gameState.roundState.titleGuessed = true;
        this.gameState.score += this.calculateScore();
        this.gameState.roundState.ended = true;
        this.checkNextRoundExists()
      } else {
        // wrong guess was made
        if(this.gameState.roundState.songGuesses >= 5){
          this.gameState.roundState.songGuesses += 1;
          this.gameState.roundState.ended = true;
          this.checkNextRoundExists()
        } else {
          this.gameState.roundState.songGuesses += 1;
          this.gameState.roundState.titleGuessed = false;
        }
      }
      this.updateState.emit(this.gameState);
      this.guessTrackForm.controls['track'].setValue("")
    }
  }

  checkNextRoundExists(){
    if(this.gameState){
      this.nextRoundExists = (this.gameState.round < this.gameState.tracks.length ? true : false)
    }    
  }

  navigateResults(){
    const workingState: GameState = {...this.gameState!, round: 6}
    this.updateState.emit(workingState)
    this.router.navigateByUrl('/results')
  }

  nextRound(){
    if(this.gameState){
      this.gameState.round += 1;
      this.gameState.roundState = {
        ...this.resetRound
      };
      this.updateState.emit(this.gameState);
    }
  }

  giveUp(){
    if(!this.gameState) {
      this.router.navigateByUrl('/')
      return
    }
    this.gameState.roundState.ended = true;
    this.gameState.roundState.songGuesses = 6;
    this.gameState.roundState.artistGuessed = false;
    this.checkNextRoundExists()
    this.updateState.emit(this.gameState);
  };

}
