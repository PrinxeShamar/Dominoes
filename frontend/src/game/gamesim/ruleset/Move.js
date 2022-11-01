export default class Move {
  constructor(domino, endId, connectedSide) {
    this.domino = domino;
    this.endId = endId;
    this.connectedSide = connectedSide;
  }

  get domino() {
    return this._domino;
  }

  get endId() {
    return this._endId;
  }

  get connectedSide() {
    return this._connectedSide;
  }

  set domino(domino) {
    this._domino = domino;
  }

  set endId(endId) {
    this._endId = endId;
  }

  set connectedSide(connectedSide) {
    this._connectedSide = connectedSide;
  }
}
