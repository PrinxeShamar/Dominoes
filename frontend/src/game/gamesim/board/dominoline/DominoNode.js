/**
 * Acts as a container class of Domino
 */
export default class DominoNode {
  constructor(domino, ends) {
    console.log(`DominoNode(${domino}, ${ends})`);
    this.domino = domino;
    this.ends = ends;
    this.adjacent = [DominoNode[ends], DominoNode[ends]];
    this.filled = [0, 0];
  }

  get x() {
    return this.domino.x;
  }

  get y() {
    return this.domino.y;
  }

  get sides() {
    return this.domino.sides;
  }

  get empty() {
    return [this.ends[0] - this.filled[0], this.ends[1] - this.filled[1]];
  }

  valToIndex(val) {
    if (val === this.x) {
      return 0;
    }
    if (val === this.y) {
      return 1;
    }
    return -1;
  }

  indexToVal(index) {
    if (index === 0) {
      return this.x;
    }
    if (index === 1) {
      return this.y;
    }
    return -1;
  }

  valFilled(val) {
    let index = this.valToIndex(val);
    return this.indexFilled(index);
  }

  indexFilled(index) {
    return this.filled[index] >= this.ends[index];
  }

  addToEnd(domino, ends) {
    if (this.filled === this.ends) {
      throw new Error("This domino has no more available ends");
    }
    // Create the node with domino and other ends
    let tmp = new DominoNode(domino, ends);
    // Add node to the adjacency list
    this.adjacent[this.filled] = tmp;
    // Incriment the filled variable
    ++this.filled;
  }
}
