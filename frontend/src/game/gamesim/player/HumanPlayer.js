import Player from "../Player";

export default class HumanPlayer extends Player {
  pickMove(moves) {
    if (moves.length === 0) {
      return null;
    }
    console.log(`HumanPlayer.pickMove(${moves})`);
    let rawinput = NaN;
    while (isNaN(rawinput) || rawinput < 0 || rawinput >= moves.length) {
      rawinput = parseInt(
        prompt(
          `${this.visual.lineStr}\nHand:\n${
            this.visual.handStr
          }\n${moves}\nPlayer ${this.playerId + 1} Move:`
        )
      );
      if (rawinput === "v") {
        console.log(`${this.visual}`);
      }
    }
    return moves[rawinput];
  }
}
