export default class TurnSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.roundNum = 0;
    this.playing = 0;
  }

  get winning() {
    let winner = this.players[0];
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].points > winner[i].points) {
        winner = this.players[i];
      }
    }
    return winner;
  }

  start(playing) {
    while (this.winning.points < this.ruleSet.stopCondition) {
      ++this.roundNum;
      this.roundSim.start();
    }
  }
}
