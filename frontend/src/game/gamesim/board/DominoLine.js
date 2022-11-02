import DominoNode from "./dominoline/DominoNode";

/**
 * Structured as a sort of linked list of DominoNodes.
 * This functions as the face up line of dominoes.
 */
export default class DominoLine {
  constructor() {
    this.length = 0;
    // Nodes are held at indices that act as IDs
    this.nodes = [];
    // Ends are OPEN end points with indices that
    // represent the ID of the corresponding node
    this.ends = [];
    // What side to add the domino (0 = left, 1 = right)
    // 2 is up, 3 is down (later use)
    this.orient = [];
    this.repStr = "";
  }

  get ends() {
    return this._ends;
  }

  set ends(ends) {
    this._ends = [...ends];
  }

  play(move, endCounts) {
    //throw new Error("STOP");
    console.log(`DominoLine.play(${move}, ${endCounts})`);
    if (this.length === 0) {
      // This is the first move
      // Create the first node
      let node = new DominoNode(move.domino, endCounts);
      // For each index of endCounts
      for (let index = 0; index < endCounts.length; index++) {
        // Sides = end values
        let sides = node.sides;
        // For each end to be added to this side
        for (let i = 0; i < endCounts[index]; i++) {
          // Add node to the list of nodes
          this.nodes.push(node);
          // Add end value to the same index as the node
          this._ends.push(sides[index]);
        }
      }

      this.orient = [0, 1];
      this.repStr = `${node.toString()}`;
      ++this.length;
    } else {
      let domino = move.domino;
      let endId = move.endId;
      let connectedSide = move.connectedSide;
      // Create node for domino
      let node = new DominoNode(domino, endCounts);
      // Connect nodes both ways
      node.connectTo(this.nodes[endId], connectedSide);
      this.nodes[endId].connectTo(node, connectedSide);
      // Adjust nodes and ends accordingly
      let orientation = this.orient[endId];

      // Delete the end this was connected to
      this.remove(endId);

      // Add extra ends of 0 side
      let empty = node.empty;
      for (let i = 0; i < empty[0]; i++) {
        this.nodes.push(node);
        this._ends.push(node.x);
        this.orient.push(orientation);
      }
      // Do the same for the 1 side
      for (let i = 0; i < empty[1]; i++) {
        this.nodes.push(node);
        this._ends.push(node.y);
        this.orient.push(orientation);
      }

      if (orientation === 0) {
        if (connectedSide === node.y) {
          this.repStr = node.toString(false) + this.repStr;
        } else {
          this.repStr = node.toString(true) + this.repStr;
        }
      } else {
        if (connectedSide === node.x) {
          this.repStr = this.repStr + node.toString(false);
        } else {
          this.repStr = this.repStr + node.toString(true);
        }
      }
      ++this.length;
    }
  }

  remove(endId) {
    this.nodes.splice(endId, 1);
    this._ends.splice(endId, 1);
    this.orient.splice(endId, 1);
  }

  toString() {
    console.log(`Line Len = ${this.length}`);
    return this.repStr;
  }
}
