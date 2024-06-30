import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/services/localStorage';
import GameState from 'src/types/GameState';

@Component({
  selector: 'app-guess-bar',
  templateUrl: './guess-bar.component.html',
  styleUrls: ['./guess-bar.component.css']
})
export class GuessBarComponent implements OnInit {

  @Input() wrongGuesses: number = 0;
  @Input() rightGuesses: boolean = false;
  @Input() totalGuesses: number = 0;
  @Input() artistGuessState: number = 0;
  arrSize: number = 0;
  constructor() {
  }
  
  ngOnChanges(): void {
    this.arrSize = Math.max(this.totalGuesses-this.wrongGuesses-(this.rightGuesses ? 1 : 0)-(this.rightGuesses ? 0 : 1),0)
  }

  ngOnInit(): void {
  }


  createArray(number: number){
    return Array(number).fill(0);
  }
}
