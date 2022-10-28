import DominoNode from "./dominoline/DominoNode";

/**
 * Structured as a sort of linked list of DominoNodes.
 * This functions as the face up line of dominoes.
 */
export default class DominoLine {
  constructor() {
    this.length = 0;
    this.heads = new Array(256).fill(null);
  }

  /*
  start(domino) {
    this.ends[0] = new DominoNode(domino);
    this.ends[1] = new DominoNode(domino);
  }
  */

  play(move) {
    if (this.length == 0) {
      this.heads[0] = move.domino;
    }
  }
}
