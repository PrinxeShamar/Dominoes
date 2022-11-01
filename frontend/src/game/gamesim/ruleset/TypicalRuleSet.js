import RuleSet from "../RuleSet";
import Move from "./Move";

export default class TypicalRuleSet extends RuleSet {
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
    return board.ends[move.endId] === move.connectedSide;
  }

  play(board, move) {
    let dominoNode = board.place(move.domino, move.end, move.connectedSide);
    dominoNode.addEnd();
  }

  matchStop(players) {
    console.log(`TypicalRuleSet.matchStop(${players})`);
    let maxPoints = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].points > maxPoints) {
        maxPoints = players[i].points;
      }
    }
    return maxPoints >= this.stopCondition;
  }

  winning(players) {
    console.log(`TypicalRuleSet.winning(${players})`);
    let winner = players[0];
    console.log(winner);
    let maxPoints = winner.points;
    for (let i = 1; i < players.length; i++) {
      if (players[i].points > maxPoints) {
        winner = players[i];
        maxPoints = winner.points;
      }
    }
    return winner.playerId;
  }

  //If this returns false, that will force a reshuffle
  firstMove(lastWinner, players) {
    let player = null;
    if (lastWinner == null) {
      this.highestDoubleHolder(players);
    }
    return new Move(player.highestDouble);
  }

  highestDoubleHolder(players) {
    let domino = null;
    let player = null;
    for (let i = 0; i < players.length; i++) {
      if (domino == null) {
        domino = players[i].highestDouble;
        player = players[i];
      }
    }
    return player;
  }

  setup(board, players) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < this.handSize; j++) {
        players[i].drawFrom(board);
      }
    }
  }

  roundWinner(players) {
    console.log(`TypicalRuleSet.roundWinner(${players})`);
    let winner = players[0];
    for (let i = 1; i < players.length; i++) {
      if (players[i].lighterThan(winner)) {
        winner = players[i];
      }
    }
    return winner;
  }
}
