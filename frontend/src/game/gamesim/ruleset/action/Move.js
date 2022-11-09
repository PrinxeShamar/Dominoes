import Action from "../Action";

export default class Move extends Action {
  constructor(domino, endId, connectedSide) {
    super();
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

  toString() {
    return `Move(${this._domino}, ${this._endId}, ${this._connectedSide})`;
  }
}
