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
    this.boneyard = new Boneyard(dominoSet.dominoes);
    this.dominoLine = new DominoLine();
  }

  play(move) {
    console.log(`Board.play(${move})`);
    this.dominoLine.play(move);
  }

  pop() {
    console.log(`Board.pop()`);
    return this.boneyard.pop();
  }

  toString() {
    return `${this.boneyard.toString()}`;
  }
}
