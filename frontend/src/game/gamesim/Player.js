import Hand from "./player/Hand";
export default class Player {
  constructor(playerId) {
    this.hand = new Hand();
    this.points = 0;
    this.playerId = playerId;
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
    this.hand = new Hand();
  }

  addPoints(total) {
    this._points += total;
  }

  toString() {
    return `Player(${this.playerId}): (${this.hand})`;
  }
}
