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
    this.dominoSet = dominoSet;
    this.boneyard = new Boneyard();
    this.dominoLine = new DominoLine();
  }

  play(move) {
    this.dominoLine.play(move);
  }

  pop() {
    return this.boneyard.pop();
  }
}
