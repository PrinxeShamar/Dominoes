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
    this.ruleSet.startRound(this.turnSim, lastWinner);
    while (!this.ruleSet.roundOver(this)) {
      this.ruleSet.startTurn(this.turnSim, lastWinner);
    }
  }
}
