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

  get running() {
    return this.playing != null;
  }

  get winning() {
    return this.ruleSet.winning(this.players);
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

  setup() {
    console.log(`TurnSim.setup()`);
    console.log(this.players);
    this.ruleSet.setup(this.board, this.players);
  }

  // Starts the process of the turns of this round
  start(lastWinner) {
    // This is the first turn of a new round
    //console.log(`TurnSim.start(${lastWinner})`);
    console.log("Starting The First Turn");
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

    //console.log(this.playing);

    //console.log(`Legal Actions: ${this.legalActions.toString()}`);

    //console.log(this.board.lineStr);
    if (this.playing.autoPlays === true) {
      console.log("The First Player Happened To Be Automatic");
      this.autoAct();
    }
    console.log("COMPLETED TURN START");
  }

  // Increment this turn to the next turn of this round
  next(action) {
    console.log(`TurnSim.next()`);
    this.playing = this.ruleSet.nextPlayer(this.playing, this.players, action);
    for (let observer of this.observers) {
      observer.updatePlayingId(this.playing.playerId);
    }
  }

  //Returns false IFF there's no next turn
  playerActs(playerId, action) {
    //testing
    action = this.legalActions[action];
    console.log(`TurnSim.playerActs(${playerId}, ${action})`);

    if (playerId !== this.playing.playerId) {
      console.log("The Wrong Player Tried To Act");
      return false;
    }
    if (!this.legalActions.includes(action)) {
      console.log("The Action Wasn't Valid");
      console.log(`${action} Isn't In ${this.legalActions}`);
      return false;
    }
    console.log(`Player ${playerId} Will Attempt To ${action}`);
    this.playing.actionToBoard(action, this.board);
    for (let observer of this.observers) {
      observer.playerActed(this.playing.playerId, action);
      observer.updateBoard(this.board);
    }
    if (action.constructor === Pass) {
      console.log("PASS");
      ++this.passes;
    } else {
      this.passes = 0;
    }
    if (!this.ruleSet.roundStop(this.players, this.passes)) {
      this.next(action);
      this.legalActions = this.ruleSet.legalActions(this.board, this.playing);
      console.log(`BOARD STATE\n${this.board.lineStr}`);
      if (this.playing.autoPlays === true) {
        return this.autoAct();
      }
      return true;
    }
    this.playing = null;
    return false;
  }

  autoAct() {
    console.log(`TurnSim.autoAct()`);
    return this.playerActs(
      this.playing.playerId,
      //testing
      0
      //this.playing.pickMove(this.legalActions)
    );
  }
}
