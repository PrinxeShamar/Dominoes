import Hand from "./player/Hand";
export default class Player {
  constructor(hand, points) {
    this.hand = new Hand();
    this.points = 0;
  }

  drawFrom(dominoes) {
    hand.drawFrom(dominoes);
  }
}
