export default interface RoundState {
  artistGuessed: boolean;
  artistGuessComplete: boolean;
  artistHint: boolean;
  albumHint: boolean;
  titleHint: boolean;
  songGuesses: number;
  titleGuessed: boolean;
  ended: boolean;
}