import Board from "./gamesim/Board";
import DominoSet from "./gamesim/DominoSet";
import MatchSim from "./gamesim/MatchSim";
import Player from "./gamesim/Player";
import DrawRuleSet from "./gamesim/ruleset/DrawRuleSet";
import BlockRuleSet from "./gamesim/ruleset/BlockRuleSet";

/**
 * GameSim takes raw game parameters that define the
 * way the game is played and uses them to create
 * and control the game itself.
 */
class GameSim {
  constructor(ruleName, playerCount, customRules) {
    this.board = new Board();
    this.dominoSet = new DominoSet(dRange);
    this.matchSim = new MatchSim();
    this.players = Player[playerCount];
    this.ruleSet = mapRule(ruleName, customRules);
  }

  mapRule(ruleStr, customRules) {
    switch (toLowerCase(ruleStr)) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
    }
  }
}
