import Hand from "./player/Hand";
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
    this.hand = new Hand();
  }

  addPoints(total) {
    console.log(`Player.addPoints(${total})`);
    this._points += total;
  }

  remove(domino) {
    console.log(`Player.remove(${domino})`);
    this._hand.remove(domino);
  }

  play(board, move, endCounts) {
    console.log(`Player.play(${board}, ${move}, ${endCounts})`);
    let l1 = this.length;
    board.play(move, endCounts);
    this.remove(move.domino);
    if (l1 !== this.length + 1) {
      throw new Error(`Sanity Check Fail`);
    }
  }

  pickMove(moves) {
    throw new Error("Method Not Implemented");
  }

  toString() {
    return `Player(${this.playerId}): (${this.hand})`;
  }
}
