export default class Move {
  constructor(domino, endId, connectedSide) {
    this.domino = domino;
    this.endId = endId;
    this.connectedSide = connectedSide;
  }

  get domino() {
    return this.domino;
  }

  get endId() {
    return this.endId;
  }

  get connectedSide() {
    return this.connectedSide;
  }
}
