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
    console.log(`Welcome to the TurnSim\n
    Today, we'll be trying to figure out what I do.\n
    Clearly, the game needs to be played somehow,\n
    and I'm supposed to represent the lowest level\n
    of simulation. The players will need to be\n
    prompted by actions. We can try a literal prompt\n
    method as a temp structure. We'll skip this\n
    for now`);
    //assume the last turn of the round was just played
  }

  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.next(this.playing, this.players);
  }
}
