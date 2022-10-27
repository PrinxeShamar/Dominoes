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
  /**
   * @param {String} ruleName
   * @param {Map<String, Number>} customRules
   */
  constructor(ruleName, customRules) {
    this.board = new Board();
    this.dominoSet = new DominoSet(dRange);
    this.matchSim = new MatchSim();
    this.ruleSet = mapRule(ruleName, customRules);
    this.players = Player[ruleSet.getPlayerCount()];
  }

  /**
   * @param {String} ruleStr
   * @param {Map<String, Number>} customRules
   * @returns {RuleSet}
   */
  mapRule(ruleStr, customRules) {
    switch (toLowerCase(ruleStr)) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
    }
  }
}
