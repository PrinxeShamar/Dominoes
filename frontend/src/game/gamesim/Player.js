import Hand from "./player/Hand";
import Move from "./ruleset/action/Move";
import Draw from "./ruleset/action/Draw";
import Pass from "./ruleset/action/Pass";

/**
 * This is the connective class between
 * the game and the player. The visual
 * object is the interface
 */
export default class Player {
  constructor(playerId, visual) {
    this.hand = new Hand();
    this.points = 0;
    this.playerId = playerId;
    this.visual = visual;
  }

  get length() {
    return this._hand.length;
  }

  get highestDouble() {
    return this._hand.highestDouble;
  }

  get hand() {
    return this._hand;
  }

  get points() {
    return this._points;
  }

  get playerId() {
    return this._playerId;
  }

  set hand(hand) {
    this._hand = hand;
  }

  set points(points) {
    this._points = points;
  }

  set playerId(playerId) {
    this._playerId = playerId;
  }

  drawFrom(dominoes) {
    console.log(`Player.drawFrom(${dominoes})`);
    this.hand.drawFrom(dominoes);
  }

  lighterThan(other) {
    console.log(`Player.lighterThan(${other})`);
    return this.hand.lighterThan(other.hand);
  }

  dropAll() {
    console.log(`Player.dropAll()`);
    this.hand.clear();
  }

  addPoints(total) {
    console.log(`Player.addPoints(${total})`);
    this._points += total;
  }

  remove(domino) {
    console.log(`Player.remove(${domino})`);
    this._hand.remove(domino);
  }

  pass() {
    console.log(`Player.pass()`);
    this.visual.announcePass();
  }

  play(move, board) {
    console.log(`Player.play(${move}, ${board})`);
    let l1 = this.length;
    this.remove(move.domino);
    board.play(move);
    if (l1 !== this.length + 1) {
      throw new Error(`Sanity Check Fail`);
    }
  }

  actionToBoard(action, board) {
    switch (action.constructor) {
      case Move:
        this.play(action, board);
        break;
      case Draw:
        this.drawFrom(action, board);
        break;
      case Pass:
        this.pass();
        break;
      default:
        throw new Error("Action Undefined");
    }
  }

  updateVisual(instr) {
    this.visual.updateVisual(instr);
  }

  update(instr) {
    console.log(`Player[${this.playerId}].update.(${instr})`);
  }

  pickMove(moves) {
    throw new Error("Method Not Implemented");
  }

  toString() {
    return `Player(${this.playerId}): (${this.hand})`;
  }
}
