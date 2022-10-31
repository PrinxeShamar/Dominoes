import RuleSet from "../RuleSet";

export default class TwoEdgeRuleSet extends RuleSet {
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
    return board.ends[move.endID] === move.connectedSide;
  }

  play(board, move) {
    let dominoNode = board.place(move.domino, move.end, move.connectedSide);
    dominoNode.addEnd();
  }
}
