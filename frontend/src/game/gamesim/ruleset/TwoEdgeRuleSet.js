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

  matchStop(players) {
    console.log(`TwoEdgeRuleSet.matchStop(${players})`);
    let maxPoints = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].points > maxPoints) {
        maxPoints = players[i].points;
      }
    }
    return maxPoints >= this.stopCondition;
  }

  winning(players) {
    console.log(`TwoEdgeRuleSet.winning(${players})`);
    let winner = players[0];
    console.log(winner);
    let maxPoints = winner.points;
    for (let i = 1; i < players.length; i++) {
      if (players[i].points > maxPoints) {
        winner = players[i];
        maxPoints = winner.points;
      }
    }
    return winner;
  }
}
