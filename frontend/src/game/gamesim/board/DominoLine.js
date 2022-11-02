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
  }

  get ends() {
    return this._ends;
  }

  set ends(ends) {
    this._ends = [...ends];
  }

  play(move, endCounts) {
    console.log(`DominoLine.play(${(move, endCounts)})`);
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
          this._ends.push(sides[i]);
        }
      }
      // increment the length
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
      // Delete the end this was connected to
      this.remove(endId);
      // Add extra ends of 0 side
      let empty = node.empty;
      for (let i = 0; i < empty[0]; i++) {
        this.nodes.push(node);
        this._ends.push(node.x);
      }
      // Do the same for the 1 side
      for (let i = 0; i < empty[1]; i++) {
        this.nodes.push(node);
        this._ends.push(node.y);
      }
    }
  }

  remove(endId) {
    this.nodes.splice(endId, 1);
    this._ends.splice(endId, 1);
  }
}
