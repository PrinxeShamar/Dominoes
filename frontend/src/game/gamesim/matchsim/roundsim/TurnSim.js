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

  setup() {
    console.log(`RoundSim.setup()`);
    this.ruleSet.setup(this.board, this.players);
  }

  start(lastWinner) {
    // This is the first turn of a new round
    console.log(`TurnSim.start()`);
    // While there's a problem getting a first player,
    // keep resetting
    let firstOp = null;
    while (firstOp == null) {
      this.setup();
      firstOp = this.ruleSet.firstPlayerMoves(lastWinner, this.players);
    }
    let playing = firstOp[0];
    let moves = firstOp[1];

    console.log(playing);

    let move = playing.pickMove(moves);
    playing.play(this.board, move, this.ruleSet.endCounts(move));
    while (!this.ruleSet.roundStop(this.players, this.passes)) {
      playing = this.ruleSet.nextPlayer(playing, this.players);
      moves = this.ruleSet.legalMoves(this.board, playing);
      move = playing.pickMove(moves);
      if (move != null) {
        playing.play(this.board, move, this.ruleSet.endCounts(move));
      } else {
        console.log("PASS");
      }
    }

    //assume the last turn of the round was just played
  }

  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.next(this.playing, this.players);
  }
}
