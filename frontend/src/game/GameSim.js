import Board from "./gamesim/Board";
import DominoSet from "./gamesim/DominoSet";
import MatchSim from "./gamesim/MatchSim";
import Player from "./gamesim/Player";
import DrawRuleSet from "./gamesim/ruleset/twoedgeruleset/DrawRuleSet";
import BlockRuleSet from "./gamesim/ruleset/twoedgeruleset/BlockRuleSet";

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
    for (let i = 0; i < tmp.length; i++) {
      tmp[i] = this.winnerList[i];
    }
    return this.tmp;
  }

  /**
   * @param {String} ruleStr
   * @param {Map<String, Number>} customRules
   * @returns {RuleSet}
   */
  static mapRule(ruleName, customRules) {
    switch (ruleName.toLowerCase()) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
      default:
        throw new Error(`${ruleName} Rule Set Not Defined`);
    }
  }

  start() {
    ++this.matchNum;
    this.matchSim.start();
    this.winnerList.push(this.matchSim.winner);
  }

  changeRules(ruleName, customRules) {
    this.ruleSet = GameSim.mapRule(ruleName, customRules);
    this.dominoSet = new DominoSet(
      this.ruleSet.dRangeStart,
      this.ruleSet.dRangeEnd
    );
    this.board = new Board(this.dominoSet);
    this.players = Player[this.ruleSet.playerCount];
    for (let i = 0; i < this.players.length; i++) {
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
