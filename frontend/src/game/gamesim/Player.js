import Hand from "./player/Hand";
export default class Player {
  constructor(playerId) {
    this.hand = new Hand();
    this.points = 0;
    this.playerId = playerId;
  }

  get points() {
    return this._points;
  }

  get playerId() {
    return this._playerId;
  }

  set points(points) {
    this._points = points;
  }

  set playerId(playerId) {
    this._playerId = playerId;
  }

  drawFrom(dominoes) {
    this.hand.drawFrom(dominoes);
  }
}
