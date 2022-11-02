import TypicalRuleSet from "../TypicalRuleSet";
import Move from "../Move";

export default class DrawRuleSet extends TypicalRuleSet {
  legalMoves(board, player) {
    console.log(`DrawRuleSet.legalMoves(${board}, ${player})`);
    const moves = new Set();
    const boardEnds = board.ends;
    for (let i = 0; i < boardEnds.length; i++) {
      for (const domino of player.hand.dominoes) {
        const sides = domino.sides;
        const move1 = new Move(domino, i, sides[0]);
        if (this.isLegal(board, move1)) {
          moves.add(move1);
        }
        if (!domino.isDouble) {
          const move2 = new Move(domino, i, sides[1]);
          if (this.isLegal(board, move2)) {
            moves.add(move2);
          }
        }
      }
    }

    if (moves.length === 0 && board.boneyard.length >= 1) {
      player.drawFrom(board.boneyard);
      return this.legalMoves(board, player);
    }
    //This assumes a player will always need to pass
    //when there's no moves, no matter the game mode
    return moves;
  }
}
