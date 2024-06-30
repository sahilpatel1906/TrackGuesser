import { Component, Input, OnInit } from '@angular/core';
import GameState from 'src/types/GameState';


@Component({
  selector: 'app-game-bar',
  standalone: true,
  imports: [],
  templateUrl: './game-bar.component.html',
  styleUrls: ['./game-bar.component.css']
})
export class GameBarComponent implements OnInit{

  @Input() gameState: GameState | null = null;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

}
