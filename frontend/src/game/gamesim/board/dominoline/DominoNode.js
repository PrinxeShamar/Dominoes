/**
 * Acts as a container class of Domino
 */
export default class DominoNode {
  constructor(domino, ends) {
    console.log(`DominoNode(${domino}, ${ends})`);
    this.domino = domino;
    this.ends = ends;
    this.adjacent = [
      new Array(ends[0]).fill(null),
      new Array(ends[1]).fill(null),
    ];
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

  get left() {
    return this.adjacent[0][0];
  }

  get right() {
    return this.adjacent[1][0];
  }

  get isDouble() {
    return this.domino.isDouble;
  }

  valToIndex(val) {
    // Tries to get an unfilled index
    if (val === this.x) {
      if (this.isDouble && this.indexFilled(0)) {
        return 1;
      }
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

  connectTo(otherNode, connectedSide) {
    console.log(`DominoNode.connectTo(${otherNode}, ${connectedSide})`);
    const sideIndex = this.valToIndex(connectedSide);
    if (this.filled[sideIndex] >= this.ends[sideIndex]) {
      throw new Error("This domino has no more available ends");
    }
    // Add node to the adjacency list
    this.adjacent[sideIndex][this.filled[sideIndex]] = otherNode;
    // Incriment the filled variable
    this.filled[sideIndex]++;
  }

  toString(reverse) {
    return this.domino.toString(reverse);
  }
}
