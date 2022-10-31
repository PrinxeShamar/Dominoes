import Hand from "./player/Hand";
export default class Player {
  constructor() {
    this.hand = new Hand();
    this.points = 0;
  }

  get points() {
    return this._points;
  }

  set points(points) {
    this._points = points;
  }

  drawFrom(dominoes) {
    this.hand.drawFrom(dominoes);
  }
}
