import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  showLeaderboard : boolean = false;
  showHelp : boolean = false;

  ngOnInit(): void {
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }
  updateHelpState(state: boolean){
    this.showHelp = state;
  }
  toggleLeaderboard() {
    this.showLeaderboard = !this.showLeaderboard;
  }
  updateLeaderboardState(state: boolean){
    this.showLeaderboard = state;
  }
}
