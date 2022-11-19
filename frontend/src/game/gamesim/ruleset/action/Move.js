import Action from "../Action";

export default class Move extends Action {
  constructor(domino, endId, orient, connectedSide, endCounts) {
    super();
    console.log(
      `Move(${domino}, ${endId}, ${orient}, ${connectedSide}, ${endCounts})`
    );
    this.domino = domino;
    this.endId = endId;
    this.orient = orient;
    this.connectedSide = connectedSide;
    this.endCounts = endCounts;
    if (endId !== orient) {
      throw new Error("Doesn't make sense (yet)!");
    }
  }

  get leftRight() {
    let lr = "";
    if (this._orient === 1) {
      lr = "left";
    }
    if (this._orient === 1) {
      lr = "right";
    }
    if (this.orient === 2) {
      lr = "up";
    }
    if (this.orient === 3) {
      lr = "down";
    } else {
      console.log("This better be an empty board");
    }
    return lr;
  }

  get domino() {
    return this._domino;
  }

  get endId() {
    return this._endId;
  }

  get orient() {
    return this._orient;
  }

  get connectedSide() {
    return this._connectedSide;
  }

  get endCounts() {
    return this._endCounts;
  }

  set domino(domino) {
    this._domino = domino;
  }

  set endId(endId) {
    this._endId = endId;
  }

  set orient(orient) {
    this._orient = orient;
  }

  set connectedSide(connectedSide) {
    this._connectedSide = connectedSide;
  }

  set endCounts(endCounts) {
    this._endCounts = endCounts;
  }

  toString() {
    if (this._connectedSide <= -1) {
      return `(Play ${this._domino})`;
    }
    return `(Play ${this._domino} on the ${this.leftRight} connected to ${this._connectedSide})`;
  }
}
