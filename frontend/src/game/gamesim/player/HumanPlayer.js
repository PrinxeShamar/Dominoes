import Player from "../Player";

export default class HumanPlayer extends Player {
  pickMove(moves) {
    console.log(`HumanPlayer.pickMove(${moves})`);
  }
}
