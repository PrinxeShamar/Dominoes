import TypicalRuleSet from "../TypicalRuleSet";
import Move from "../action/Move";
import Pass from "../action/Pass";

export default class BlockRuleSet extends TypicalRuleSet {
  legalActions(board, player) {
    const moves = [];
    const boardEnds = board.ends;
    for (let i = 0; i < boardEnds.length; i++) {
      for (const domino of player.hand.dominoes) {
        const sides = domino.sides;
        const move1 = new Move(domino, i, sides[0]);
        if (this.isLegal(board, move1)) {
          moves.push(move1);
        }
        if (!domino.isDouble) {
          const move2 = new Move(domino, i, sides[1]);
          if (this.isLegal(board, move2)) {
            moves.push(move2);
          }
        }
      }
    }
    if (moves.length === 0) {
      return [new Pass()];
    }
    return moves;
  }
}
