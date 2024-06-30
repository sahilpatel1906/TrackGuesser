import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/localStorage';
import LeaderboardScore from 'src/types/LeaderboardScore';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboard: LeaderboardScore[] | null = null;

  @Input() show: boolean = false;
  @Output() leaderboardState = new EventEmitter<boolean>();

  constructor(private storageService: StorageService, private router: Router) {
    const leaderboardStored = <LeaderboardScore[]|null>storageService.retrieve('leaderboard');
    if(!leaderboardStored) {
      router.navigateByUrl('/')
    } else {
      this.leaderboard = leaderboardStored;
    }
   }

  ngOnInit(): void {
  }

  ngOnChanges() {
    const leaderboardStored = <LeaderboardScore[]|null>this.storageService.retrieve('leaderboard');
    if(leaderboardStored) {
      this.leaderboard = leaderboardStored;
    }
  }

  filterLeaderboard (mode : "easy"|"normal"|"hard") {
    if(!this.leaderboard){
      return []
    }else {
      return this.leaderboard.filter((item) => 
        item.mode === mode).sort((a, b) => b.score - a.score);
    }    
  }

  filterForm: FormGroup = new FormGroup({
    mode: new FormControl<"easy" | "normal" | "hard" | undefined>(undefined)
  })

  closeModal() {
    this.show = false;
    this.leaderboardState.emit(false)
  }

  closeByClickOutside(event: any) {
    if(event.target.id == "outside-modal"){
      this.closeModal();
    }
  }

}
