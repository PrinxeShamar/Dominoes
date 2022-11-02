import TurnSim from "./roundsim/TurnSim";

export default class RoundSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.next();
    this.roundNum = 0;
    this.winner = null;
  }

  start() {
    console.log(`RoundSim.start()`);
    while (!this.ruleSet.matchStop(this.players)) {
      console.log("Continue RoundSim");
      ++this.roundNum;
      this.turnSim.start(this.winner);
      this.winner = this.ruleSet.roundWinner(this.players);
      this.ruleSet.addPoints(this.winner, this.players);
      this.next();
    }
  }

  next() {
    console.log(`RoundSim.next()`);
    this.turnSim = new TurnSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
    this.turnNum = 0;
    this.board.reset();
  }
}
