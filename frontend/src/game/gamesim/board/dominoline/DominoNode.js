/**
 * Acts as a container class of Domino
 */
export default class DominoNode {
  constructor(domino, ends) {
    this.domino = domino;
    this.ends = ends;
    this.adjacent = DominoNode[ends];
    this.filled = 0;
  }

  get isFilled() {
    return this.filled < this.ends;
  }

  addToEnd(domino, otherEnds) {
    if (this.filled === this.ends) {
      throw new Error("This domino has no more available ends");
    }
    // Create the node with domino and other ends
    let tmp = new DominoNode(domino, otherEnds + 1);
    // Add node to the adjacency list
    this.adjacent[this.filled] = tmp;
    // Incriment the filled variable
    ++this.filled;
  }
}
