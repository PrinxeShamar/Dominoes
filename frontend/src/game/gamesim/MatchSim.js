import RoundSim from "./matchsim/RoundSim";

export default class MatchSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.roundSim = new RoundSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
    this.roundNum = 0;
    this.lastWinner = null;
  }

  get winning() {
    return this.ruleSet.winning(this.players);
  }

  start() {
    while (this.ruleSet.matchStop(this.winning.points)) {
      ++this.roundNum;
      this.roundSim.start(this.lastWinner);
    }
  }
}
