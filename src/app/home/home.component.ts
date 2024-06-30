import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import LeaderboardScore from "src/types/LeaderboardScore";
import { StorageService } from "src/services/localStorage";
import Playlist from "src/types/Playlist";
import { generateGame } from "src/services/game";
import { Router } from "@angular/router";
import GameState from "src/types/GameState";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  leaderboard: LeaderboardScore[] | null = [
    { name: "Alice", mode: "easy", score: 1900 },
    { name: "Bob", mode: "easy", score: 2000 },
    { name: "Charlie", mode: "easy", score: 2800 },
    { name: "David", mode: "easy", score: 2900 },
    { name: "Eve", mode: "easy", score: 800 },
    { name: "Frank", mode: "easy", score: 700 },
    { name: "Grace", mode: "easy", score: 1700 },
    { name: "Heidi", mode: "easy", score: 3200 },
    { name: "Ivan", mode: "easy", score: 3400 },
    { name: "Judy", mode: "easy", score: 1400 },
    { name: "Alice", mode: "normal", score: 2200 },
    { name: "Bob", mode: "normal", score: 2800 },
    { name: "Charlie", mode: "normal", score: 2300 },
    { name: "David", mode: "normal", score: 3600 },
    { name: "Eve", mode: "normal", score: 2900 },
    { name: "Frank", mode: "normal", score: 1200 },
    { name: "Grace", mode: "normal", score: 1500 },
    { name: "Heidi", mode: "normal", score: 1700 },
    { name: "Ivan", mode: "normal", score: 800 },
    { name: "Judy", mode: "normal", score: 900 },
    { name: "Alice", mode: "hard", score: 1300 },
    { name: "Bob", mode: "hard", score: 3700 },
    { name: "Charlie", mode: "hard", score: 2100 },
    { name: "David", mode: "hard", score: 600 },
    { name: "Eve", mode: "hard", score: 2300 },
    { name: "Frank", mode: "hard", score: 3000 },
    { name: "Grace", mode: "hard", score: 600 },
    { name: "Heidi", mode: "hard", score: 900 },
    { name: "Ivan", mode: "hard", score: 3700 },
    { name: "Judy", mode: "hard", score: 3000 },
  ];
  
  gameState: GameState|null = null;

  constructor(private storageService: StorageService, private router: Router) {
    const leaderboardStored = <LeaderboardScore[] | null>(
      storageService.retrieve("leaderboard")
    );
    this.gameState = <GameState | null>(
      storageService.retrieve("game-state")
    );
    if (!leaderboardStored) {
      this.storageService.save("leaderboard", this.leaderboard);
    } else {
      this.leaderboard = leaderboardStored;
    }
  }

  playlists: Playlist[] = [
    {
      name: "Rock",
      id: "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U?si=697e0e8309924483",
      cover: "./assets/rock.png",
    },
    {
      name: "Classical",
      id: "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0?si=92d6d616062c4f22",
      cover: "./assets/classical.png",
    },
    {
      name: "Video Games",
      id: "https://open.spotify.com/playlist/37i9dQZF1DXdfOcg1fm0VG?si=c3b44fe20e7b4a58",
      cover: "./assets/gaming.png",
    },
  ];
  selectedPlaylist: number = -2;
  customPlaylist: string = "";
  selectedDifficulty: string = "normal";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: string = "";

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    const difficulty = localStorage.getItem("mode");
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        return;
      }
    }
    if (difficulty) {
      this.selectedDifficulty = difficulty;
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
    });
  }

  setCustomPlaylist(playlistUrl: string) {
    if (playlistUrl.length > 0) {
      this.selectedPlaylist = -1;
    }
    this.customPlaylist = playlistUrl;
  }
  selectDifficulty(selectDifficulty: string) {
    this.selectedDifficulty = selectDifficulty;
    localStorage.setItem("mode", selectDifficulty);
  }
  setPlaylist(selectedPlaylist: number) {
    this.selectedPlaylist = selectedPlaylist;
    this.customPlaylist = "";
  }
  async generateGame() {
    try {
      const game = await generateGame(
        this.token,
        this.selectedPlaylist > -1
          ? this.playlists[this.selectedPlaylist].id
          : this.customPlaylist
      );
      this.storageService.save("game-state", game);
      this.router.navigate(["/game"]);
    } catch(error: any) {
      alert(error.message)
    }
  }
}
