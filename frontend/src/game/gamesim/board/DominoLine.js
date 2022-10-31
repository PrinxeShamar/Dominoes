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
    // Ends are nodes held in a list of lists at indices
    // in those sublists that act as their IDs
    // The indices of those sublists act as head IDs
    this.ends = [];
  }

  /*
  start(domino) {
    this.ends[0] = new DominoNode(domino);
    this.ends[1] = new DominoNode(domino);
  }
  */

  play(move, ends) {
    if (this.length === 0) {
      let tmp = new DominoNode(move.domino, ends);
      this.heads.push(tmp);
    } else {
    }
  }
}
