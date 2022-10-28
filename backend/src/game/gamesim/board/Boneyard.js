import DominoNode from "./dominoline/DominoNode";

/**
 * This functions as the face-down boneyard
 */
export default class Boneyard {
  constructor() {
    this.size = 0;
    this.dominoes = new Array(256).fill(null);
  }

  add(domino) {
    this.dominoes[this.size] = domino;
    ++this.size;
  }

  pop() {
    let tmp = this.dominoes[this.size - 1];
    this.dominoes[this.size - 1] = null;
    --this.size;
    return tmp;
  }
}
