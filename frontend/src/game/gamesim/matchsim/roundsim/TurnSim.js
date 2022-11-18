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
    this.playing = null;
    this.legalActions = null;
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

  // Starts the process of the turns of this round
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
    for (let observer of this.observers) {
      observer.updatePlayingId(this.playing.playerId);
    }

    this.legalActions = firstOp[1];

    console.log(this.playing);

    console.log(this.legalActions.toString());

    console.log(this.board.lineStr);
  }

  // Increment this turn to the next turn of this round
  next() {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.nextPlayer(this.playing, this.players);
    for (let observer of this.observers) {
      observer.updatePlayingId(this.playing.playerId);
    }
  }

  playerActs(playerId, action) {
    console.log(`TurnSim.playerActs(${playerId}, ${action})`);
    //Game Event?
    //Player Event
    this.playing.actionToBoard(action, this.board);
    for (let observer of this.observers) {
      observer.playerActed(this.playing.playerId, action);
      observer.updateBoard(this.board);
    }
    if (this.legalActions.constructor === Pass) {
      console.log("PASS");
      ++this.passes;
    } else {
      this.passes = 0;
    }
    if (!this.ruleSet.roundStop(this.players, this.passes)) {
      action = null;
      //Game Event
      this.next();
      this.legalActions = this.ruleSet.legalActions(this.board, this.playing);
      console.log(`BOARD STATE\n${this.board.lineStr}`);
      return true;
    }
    return false;
  }
}
