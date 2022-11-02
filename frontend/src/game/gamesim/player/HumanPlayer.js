import Player from "../Player";

export default class HumanPlayer extends Player {
  pickMove(moves) {
    console.log(`HumanPlayer.pickMove(${moves})`);
    let rawinput = NaN;
    while (isNaN(rawinput) || rawinput < 0 || rawinput >= moves.length) {
      rawinput = parseInt(
        prompt(
          `${this.visual.lineStr}\n${moves}\nPlayer ${this.playerId + 1} Move:`
        )
      );
    }
    return moves[rawinput];
  }
}
