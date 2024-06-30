import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import GameState from 'src/types/GameState';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  token : any = "";
  @Input() gameState : GameState | null = null;
  @Input() track : string | null = null;
  play: boolean = false;
  audioSource: HTMLAudioElement|null = null;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['track']) {
      this.play = false;
      if(this.audioSource) this.audioSource.pause();
      this.audioSource = null; // reset the audio source
    }
  }

  ngOnInit(): void {
  }

  startAudio(audio: HTMLAudioElement, timeout: number) {
    this.play = true;
    audio.play();
    setTimeout(() => {
      audio.pause();
      this.play = false;
    }, timeout);

  }

  playAudio() {
    if(!this.gameState){
      //redirect to homepage
      
    } else {
      this.audioSource = new Audio(this.gameState?.tracks[this.gameState?.round - 1].previewUrl);
      let timeout = 0;
      switch(this.gameState.mode){
        case 'easy': timeout = 30000; break;
        case 'normal': timeout = 5000 + 5000 * (this.gameState.roundState.songGuesses); break;
        case 'hard': timeout = 5000; break;
      }
      if(this.gameState?.roundState?.titleGuessed) {
        timeout = 30000;
      }
      this.startAudio(this.audioSource, timeout)
    }
  }

}
