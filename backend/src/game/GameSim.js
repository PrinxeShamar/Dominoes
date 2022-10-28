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
export default class GameSim {
  /**
   * @param {String} ruleName
   * @param {Map<String, Number>} customRules
   */
  constructor(ruleName, customRules) {
    this.changeRules(ruleName, customRules);
    this.matchNum = 0;
    this.winnerList = [];
  }

  get matchNum() {
    return this.matchNum;
  }

  get winnerList() {
    let tmp = Player[this.winnerList.length];
    for (i = 0; i < tmp.length; ) return this.winnerList;
  }

  /**
   * @param {String} ruleStr
   * @param {Map<String, Number>} customRules
   * @returns {RuleSet}
   */
  static mapRule(ruleName, customRules) {
    switch (toLowerCase(ruleName)) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
    }
  }

  start() {
    ++this.matchNum;
    this.matchSim.start();
    this.winnerList.push(this.matchSim.winner);
  }

  changeRules(ruleName, customRules) {
    this.ruleSet = mapRule(ruleName, customRules);
    this.dominoSet = new DominoSet(
      this.ruleSet.dRangeStart,
      this.ruleSet.dRangeEnd
    );
    this.board = new Board(this.dominoSet);
    this.players = Player[this.ruleSet.playerCount];
    for (i = 0; i < this.players.length; i++) {
      this.players[i] = new Player(i);
    }
    this.matchSim = new MatchSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }
}
