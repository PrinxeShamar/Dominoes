import TurnSim from "./roundsim/TurnSim";

export default class RoundSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.turnSim = new TurnSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }

  start(lastWinner) {
    //To start the round, we need to know
    //who won the last round, since it determines
    //who starts this one.
    console.log(`RoundSim.start(${lastWinner})`);
    while (!this.ruleSet.roundStop(this.players)) {
      ++this.turnNum;
      console.log(`Turn ${this.turnNum}`);
      //Using the lastWinner, we can start the turn
      this.turnSim.start(lastWinner);
    }
  }
}
