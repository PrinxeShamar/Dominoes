/**
 * Acts as a container class of Domino
 */
export default class DominoNode {
  constructor(domino) {
    this.domino = domino;
    this.ends = domino.sides;
    this.adjacent = new Array(8).fill(null);
  }

  addToEnd(domino, endID) {}
}
