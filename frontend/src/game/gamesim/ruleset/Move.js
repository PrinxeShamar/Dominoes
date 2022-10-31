export default class Move {
  constructor(domino, endID, connectedSide) {
    this.domino = domino;
    this.endID = endID;
    this.connectedSide = connectedSide;
  }

  get domino() {
    return this.domino;
  }

  get endID() {
    return this.endID;
  }

  get connectedSide() {
    return this.connectedSide;
  }
}
