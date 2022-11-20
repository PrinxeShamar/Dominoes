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

  get legalActions() {
    return [...this.roundSim.legalActions];
  }

  get playing() {
    return this.roundSim.playing;
  }

  get running() {
    return this.roundSim.running;
  }

  get winner() {
    console.log("MatchSim.winner");
    return this.ruleSet.matchWinner(this.players);
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

  // Start the rounds that simulate this match
  start() {
    // Matches don't increment themselves
    //console.log("MatchSim.start()");
    for (let observer of this.observers) {
      observer.resetScore(this.players.length);
    }
    ++this.matchNum;
    console.log(`Starting Match #${this.matchNum}`);
    this.roundSim.start();
  }

  // Increment this match to the next match of the same game
  next() {
    console.log(`MatchSim.next()`);
    this.roundSim = new RoundSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }

  playerActs(playerId, action) {
    console.log(`MatchSim.playerActs(${playerId}, ${action})`);
    return this.roundSim.playerActs(playerId, action);
  }
}
