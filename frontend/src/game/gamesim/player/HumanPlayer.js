import Player from "../Player";

export default class HumanPlayer extends Player {
  pickMove(moves, board, ruleSet) {
    console.log(`HumanPlayer.pickMove(${moves}, ${board}, ${ruleSet})`);
  }
}
