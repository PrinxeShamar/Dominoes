import Player from "../Player";

export default class HumanPlayer extends Player {
  pickMove(moves) {
    console.log(`HumanPlayer.pickMove(${moves})`);
    if (moves.length === 0) {
      return null;
    }
    let rawinput = NaN;
    while (isNaN(rawinput) || rawinput < 0 || rawinput >= moves.length) {
      rawinput = parseInt(
        this.promptNormal(
          `Score: ${this.visual.score}\n${this.visual.boardRep}\nHand:\n${
            this.visual.handRep
          }\n${moves}\nPlayer ${this.playerId + 1} Move:`
        )
      );
      if (rawinput === "v") {
        console.log(`${this.visual}`);
      }
    }
    return moves[rawinput];
  }

  promptNormal(promptStr) {
    return prompt(promptStr);
  }

  promptSocket(promptStr, moves) {
    // promptStr is the old prompt message, and moves
    // is a list of legal actions. This may use any
    // number of them.
  }
}
