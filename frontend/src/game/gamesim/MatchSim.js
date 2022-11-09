import RoundSim from "./matchsim/RoundSim";

export default class MatchSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.next();
    this.matchNum = 0;
  }

  get winner() {
    console.log("MatchSim.winner");
    return this.ruleSet.matchWinner(this.players);
  }

  get observers() {
    return [...this.players];
  }

  start() {
    // Matches don't increment themselves
    console.log("MatchSim.start()");
    for (let observer of this.observers) {
      observer.resetScore(this.players.length);
    }
    ++this.matchNum;
    this.roundSim.start();
    this.next();
  }

  next() {
    console.log(`MatchSim.next()`);
    this.roundSim = new RoundSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }
}
