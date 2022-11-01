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

  setup() {
    console.log(`RoundSim.setup()`);
    this.ruleSet.setup(this.board, this.players);
  }

  start() {
    console.log(`RoundSim.start()`);
    while (!this.ruleSet.matchStop(this.players)) {
      ++this.roundNum;
      this.setup();
      this.turnSim.start();
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
  }
}
