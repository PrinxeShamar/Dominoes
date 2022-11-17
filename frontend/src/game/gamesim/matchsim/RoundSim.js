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

  get observers() {
    return [...this.players];
  }

  // Start the turns of this round
  start() {
    console.log(`RoundSim.start()`);
    while (!this.ruleSet.matchStop(this.players)) {
      console.log("Continue RoundSim");
      ++this.roundNum;
      this.turnSim.start(this.winner);
      this.winner = this.ruleSet.roundWinner(this.players);
      this.ruleSet.addPoints(this.winner, this.players);
      this.next();
      for (let observer of this.observers) {
        observer.updatePlayerScore(this.winner.playerId, this.winner.points);
        observer.updateBoard(this.board);
      }
    }
  }

  // Increment this round to the next round of the same match
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

  playerActs(playerId, action) {
    console.log(`RoundSim.playerActs(${playerId}, ${action})`);
    this.turnSim.playerActs(playerId, action);
  }
}
