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
    board.reset();
    for (let i = 0; i < players.length; i++) {
      players[i].dropAll();
      for (let j = 0; j < this.handSize; j++) {
        players[i].drawFrom(board);
      }
    }
  }

  roundWinner(players) {
    console.log(`TypicalRuleSet.roundWinner(${players})`);
    let winner = players[0];
    for (let i = 1; i < players.length; i++) {
      console.log(`${players[i]}`);
      console.log(`${winner}`);
      if (players[i].lighterThan(winner)) {
        winner = players[i];
      }
    }
    return winner;
  }

  matchWinner(players) {
    console.log(`TypicalRuleSet.roundWinner(${players})`);
    let winner = players[0];
    for (let i = 1; i < players.length; i++) {
      if (players[i].points > winner.points) {
        winner = players[i];
      }
    }
    return winner;
  }

  addPoints(player, players) {
    console.log(`TypicalRuleSet.addPoints(${player}, ${players})`);
    let total = 0;
    for (let other of players) {
      if (player.playerId !== other.playerId) {
        total += other.hand.weight;
      }
    }
    player.addPoints(total);
  }

  firstPlayerMoves(lastWinner, players) {
    let player = lastWinner;
    let moves = [];
    if (lastWinner == null) {
      // This is the first round of the match.
      let domino = null;
      for (let i = 0; i < players.length; i++) {
        if (domino == null) {
          domino = players[i].highestDouble;
          player = players[i];
        }
      }
      // Play the highest double
      moves.push(new Move(domino, -1, -1));
    } else {
      // There's been a previous round, so we
      // already know who goes first. All
      // moves are available
      for (let domino in player.hand.dominoes) {
        moves.push(new Move(domino, -1, -1));
      }
    }
    return [player, moves];
  }
}