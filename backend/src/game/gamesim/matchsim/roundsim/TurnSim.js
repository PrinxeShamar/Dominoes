export default class TurnSim {
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
  }

  get winning() {
    let winner = this.players[0];
    for (i = 1; i < this.players.length; i++) {
      if (this.players[i].points > winner[i].points) {
        winner = this.players[i];
      }
    }
    return winner;
  }

  start() {
    while (this.winning.points < this.ruleSet.stopCondition) {
      ++this.roundNum;
      this.roundSim.start();
    }
  }
}
