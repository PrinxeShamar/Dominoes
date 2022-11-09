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

import Draw from "../../ruleset/action/Draw";
import Pass from "../../ruleset/action/Pass";

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

  get observers() {
    return [...this.players];
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
      //Game Event
      this.setup();
      firstOp = this.ruleSet.firstPlayerMoves(lastWinner, this.players);
    }
    this.playing = firstOp[0];
    let moves = firstOp[1];

    console.log(this.playing);

    console.log(moves.toString());

    console.log(this.board.lineStr);
    //Game Event?
    let move = this.playing.pickMove(moves);
    //Player Event
    this.playing.actionToBoard(move, this.board);
    for (let observer of this.observers) {
      observer.playerActed(this.playing.playerId, move);
    }
    move = null;
    while (!this.ruleSet.roundStop(this.players, this.passes)) {
      console.log("Continue TurnSim");
      //Game Event
      this.next();

      //Assumes Drawing must mean the same player plays
      while (move == null || move.constructor === Draw) {
        moves = this.ruleSet.legalActions(this.board, this.playing);
        //Player Event
        move = this.playing.pickMove(moves);
        this.playing.actionToBoard(move, this.board);
        for (let observer of this.observers) {
          observer.playerActed(this.playing.playerId, move);
        }
      }

      console.log(`BOARD STATE\n${this.board.lineStr}`);

      if (move.constructor === Pass) {
        console.log("PASS");
        ++this.passes;
      } else {
        this.passes = 0;
      }
    }

    //assume the last turn of the round was just played
  }

  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.nextPlayer(this.playing, this.players);
  }
}
