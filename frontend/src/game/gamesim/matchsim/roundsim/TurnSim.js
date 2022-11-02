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
    console.log(`TurnSim.start(${lastWinner})`);
    // While there's a problem getting a first player,
    // keep resetting
    let firstOp = null;
    while (firstOp == null) {
      this.setup();
      firstOp = this.ruleSet.firstPlayerMoves(lastWinner, this.players);
    }
    this.playing = firstOp[0];
    let moves = firstOp[1];

    console.log(this.playing);

    console.log(this.board.lineStr);

    let move = this.playing.pickMove(moves);
    this.playing.play(this.board, move, this.ruleSet.endCounts(move));
    while (!this.ruleSet.roundStop(this.players, this.passes)) {
      console.log("Continue TurnSim");
      this.next();
      moves = this.ruleSet.legalMoves(this.board, this.playing);
      move = this.playing.pickMove(moves);
      if (move != null) {
        this.playing.play(this.board, move, this.ruleSet.endCounts(move));
        console.log(`BOARD STATE\n${this.board.lineStr}`);
      } else {
        console.log("PASS");
        ++this.passes;
      }
    }

    //assume the last turn of the round was just played
  }

  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.nextPlayer(this.playing, this.players);
  }
}
