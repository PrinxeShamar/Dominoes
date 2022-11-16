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
    //console.log(`Board.ends`);
    return this.dominoLine.ends;
  }

  get orient() {
    return this.dominoLine.orient;
  }

  get lineStr() {
    return this.dominoLine.toString();
  }

  // Alter the board state based on a move
  play(move) {
    console.log(`Board.play(${move})`);
    console.log(this.toString());
    this.dominoLine.play(move);
    console.log(this.toString());
  }

  //Return a random domino from the boneyard and delete it
  pop() {
    console.log(`Board.pop()`);
    return this.boneyard.pop();
  }

  toString() {
    return `${this.boneyard.toString()}|${this.lineStr}`;
  }

  reset() {
    this.boneyard = new Boneyard(this.dominoSet.dominoes);
    this.dominoLine = new DominoLine();
  }
}
