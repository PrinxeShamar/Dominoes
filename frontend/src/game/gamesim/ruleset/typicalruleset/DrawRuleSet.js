import TypicalRuleSet from "../TypicalRuleSet";
import Move from "../action/Move";
import Draw from "../action/Draw";
import Pass from "../action/Pass";

export default class DrawRuleSet extends TypicalRuleSet {
  legalActions(board, player) {
    console.log(`DrawRuleSet.legalActions(${board}, ${player})`);
    const moves = [];
    const boardEnds = board.ends;
    const boardOrients = board.orients;
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

    if (moves.length === 0 && board.boneyard.length >= 1) {
      return [new Draw("Boneyard", board.boneyard)];
    }
    //This assumes a player will always need to pass
    //when there's no moves, no matter the game mode
    const ans = moves;
    console.log(ans.toString());
    console.log(ans.length);
    if (moves.length === 0) {
      return [new Pass()];
    }
    return moves;
  }
}
