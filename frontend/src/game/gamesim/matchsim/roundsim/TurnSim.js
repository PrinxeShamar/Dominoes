/**
 * This object represents the series
 * of turns in a single round.
 *
 * It increments itself so that the next player can
 * pick a move
 *
 * The parent RoundSim will keep this same TurnSim
 * until RoundSim increments
 */

export default class TurnSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = ruleSet;
    this.dominoSet = dominoSet;
    this.board = board;
    this.players = players;
    this.playing = 0;
    this.passes = 0;
  }

  get winning() {
    return this.ruleSet.winning(this.players);
  }

  start() {
    // This is the first turn of a new round
    console.log(`TurnSim.start()`);
    console.log(`NOT IMPLEMENTED`);
  }

  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.next(this.playing, this.players);
  }
}
