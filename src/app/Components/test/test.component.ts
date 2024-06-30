import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import GameState from 'src/types/GameState';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() gameState: GameState|null = null;
  constructor() { }

  ngOnInit(): void {
  }

  @Output() updateState = new EventEmitter<GameState>();

  doThings() {
    if(!this.gameState) {
      return
    }
    const updatedState = {...this.gameState}
    updatedState.score = updatedState.score+1
    this.updateState.emit(updatedState)
  }
}
