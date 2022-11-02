import DominoLine from "./board/DominoLine";
import Boneyard from "./board/Boneyard";
/**
 * This Board class represents the state of every
 * domino that isn't in a player's hand. This
 * includes the face up dominoes and the boneyard
 * (if applicable to the game mode).
 */
export default class Board {
  constructor(dominoSet) {
    console.log(`Board(${dominoSet})`);
    this.dominoSet = dominoSet;
    this.reset();
  }

  get ends() {
    console.log(`Board.ends`);
    return this.dominoLine.ends;
  }

  play(move, endCounts) {
    console.log(`Board.play(${move}, ${endCounts})`);
    console.log(this.toString());
    this.dominoLine.play(move, endCounts);
    console.log(this.toString());
  }

  pop() {
    console.log(`Board.pop()`);
    return this.boneyard.pop();
  }

  lineStr() {
    return this.dominoLine.toString();
  }

  toString() {
    return `${this.boneyard.toString()}|${this.lineStr()}`;
  }

  reset() {
    this.boneyard = new Boneyard(this.dominoSet.dominoes);
    this.dominoLine = new DominoLine();
  }
}
