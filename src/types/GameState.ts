import RoundState from "./RoundState";
import Track from "./Track";

export default interface GameState {
  mode: "easy"|"normal"|"hard";
  round: number;
  score: number;
  tracks: Track[];
  autofillTitles: string[];
  roundState: RoundState;
}