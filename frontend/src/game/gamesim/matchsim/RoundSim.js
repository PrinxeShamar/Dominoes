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

  get playing() {
    return this.turnSim.playing;
  }

  get running() {
    return this.turnSim.running;
  }

  get observers() {
    let tmp = [];
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] != null) {
        tmp.push(this.players[i]);
      }
    }
    return tmp;
  }

  // Start the turns of this round
  start() {
    //console.log(`RoundSim.start()`);
    ++this.roundNum;
    console.log(`Starting Round #${this.roundNum}`);
    this.turnSim.start(this.winner);
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
    ++this.roundNum;
    this.board.reset();
    //console.log(this.board, this.observers);
    for (let observer of this.observers) {
      observer.updateBoard(this.board);
    }
  }

  playerActs(playerId, action) {
    console.log(`RoundSim.playerActs(${playerId}, ${action})`);
    if (!this.turnSim.playerActs(playerId, action)) {
      //Round ended
      //Check if you want another
      if (!this.ruleSet.matchStop(this.players)) {
        this.next();
        this.start();
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  autoAct() {
    console.log(`RoundSim.autoAct()`);
    return this.playerActs(
      this.playing.playerId,
      this.playing.pickMove(this.legalActions)
    );
  }
}
