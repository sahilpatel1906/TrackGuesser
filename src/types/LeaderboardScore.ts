export default interface LeaderboardScore {
  name: string;
  mode: "easy"|"normal"|"hard";
  score: number;
}