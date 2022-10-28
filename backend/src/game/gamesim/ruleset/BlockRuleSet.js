import RuleSet from "../RuleSet";
import Move from "./Move";

export default class BlockRuleSet extends RuleSet {
  defPlayerCount() {
    return 4;
  }
  defDRangeStart() {
    return 0;
  }
  defDRangeEnd() {
    return 6;
  }
  defStopCondition() {
    return 100;
  }
  defHandSize() {
    return 7;
  }
  defGoesLeft() {
    return 1;
  }

  isLegal(board, move) {
    return board.endList[move.endTag] == move.side;
  }

  legalMoves(board, player) {
    const moves = new Set();
    const boardEnds = board.endList;
    for (i = 0; i < boardEnds.length; i++) {
      for (const domino of player.hand) {
        const sides = domino.sides;
        const move1 = new Move(domino, i, sides[0]);
        if (isLegal(move1)) {
          moves.add(move1);
        }
        if (!domino.isDouble) {
          const move2 = new Move(domino, i, sides[1]);
          if (isLegal(move2)) {
            moves.add(move2);
          }
        }
      }
    }
    //This assumes a player will always need to pass
    //when there's no moves, no matter the game mode
    return moves;
  }
}
