import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import GameState from 'src/types/GameState';

@Component({
  selector: 'app-hint-zone',
  templateUrl: './hint-zone.component.html',
  styleUrls: ['./hint-zone.component.css']
})
export class HintZoneComponent implements OnInit {

  @Input() gameState: GameState|null = null;
  constructor() { }

  ngOnInit(): void {
  }

  @Output() updateState = new EventEmitter<GameState>();

  useHint(hintType: string) {
    if(!this.gameState || this.gameState == null) 
      return alert("Error: No game state!")
    if(!this.gameState.roundState) 
      return alert("Error: No round state!")
    switch(hintType) {
      case 'album':
        if(this.gameState.roundState.albumHint) 
          return alert("Error, album hint already active")
        this.gameState.roundState.albumHint = true
        this.updateState.emit(this.gameState)
        break
      case 'artist':
        if(this.gameState.roundState.artistGuessed || this.gameState.roundState.artistHint) 
          return alert("Error, artist already revealed")
        this.gameState.roundState.artistHint = true
        this.gameState.roundState.artistGuessed = false
        this.gameState.roundState.artistGuessComplete = true
        this.updateState.emit(this.gameState)
        break
      case 'title':
        if(this.gameState.roundState.titleHint) 
          return alert("Error, title hint already active")
        this.gameState.roundState.titleHint = true
        this.updateState.emit(this.gameState)
        break
    }
  }
}
