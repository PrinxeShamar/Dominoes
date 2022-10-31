import Board from "./gamesim/Board";
import DominoSet from "./gamesim/DominoSet";
import MatchSim from "./gamesim/MatchSim";
import DrawRuleSet from "./gamesim/ruleset/twoedgeruleset/DrawRuleSet";
import BlockRuleSet from "./gamesim/ruleset/twoedgeruleset/BlockRuleSet";
import ComputerPlayer from "./gamesim/player/ComputerPlayer";
import HumanPlayer from "./gamesim/player/HumanPlayer";

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
    return this._matchNum;
  }

  get winnerList() {
    console.log(`GameSim.winnerList()`);
    let tmp = new Array(this._winnerList.length);
    for (let i = 0; i < tmp.length; i++) {
      tmp[i] = this._winnerList[i];
    }
    return this.tmp;
  }

  set matchNum(matchNum) {
    this._matchNum = matchNum;
  }

  set winnerList(winnerList) {
    this._winnerList = winnerList;
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
    console.log("GameSim.start()");
    ++this.matchNum;
    this.matchSim.start();
    this._winnerList.push(this.matchSim.winner);
  }

  changeRules(ruleName, customRules) {
    console.log(`GameSim.changeRules(${ruleName}, ${customRules})`);
    this.ruleSet = GameSim.mapRule(ruleName, customRules);
    this.dominoSet = new DominoSet(
      this.ruleSet.dRangeStart,
      this.ruleSet.dRangeEnd
    );
    this.board = new Board(this.dominoSet);
    this.players = new Array(this.ruleSet.playerCount);
    this.matchSim = new MatchSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }

  fillSeats(strArr) {
    if (strArr.length !== this.ruleSet.playerCount) {
      throw new Error("Inconsistent Player Count");
    }
    for (let i = 0; i < strArr.length; i++) {
      switch (strArr[i].toLowerCase()) {
        case "human":
          this.players[i] = new HumanPlayer(i);
          break;
        case "cpu":
          this.players[i] = new ComputerPlayer(i);
          break;
        default:
          throw new Error("Invalid Player Type");
      }
    }
  }
}
