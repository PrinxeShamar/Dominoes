import Board from "./gamesim/Board";
import DominoSet from "./gamesim/DominoSet";
import MatchSim from "./gamesim/MatchSim";
import DrawRuleSet from "./gamesim/ruleset/typicalruleset/DrawRuleSet";
import BlockRuleSet from "./gamesim/ruleset/typicalruleset/BlockRuleSet";
import ComputerPlayer from "./gamesim/player/ComputerPlayer";
import HumanPlayer from "./gamesim/player/HumanPlayer";
import Visual from "./gamesim/Visual";

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

  get lineStr() {
    return this.board.lineStr;
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
    return tmp;
  }

  get players() {
    return [...this._players];
  }

  set matchNum(matchNum) {
    this._matchNum = matchNum;
  }

  set winnerList(winnerList) {
    this._winnerList = winnerList;
  }

  set players(players) {
    this._players = [...players];
  }
  /**
   * @param {String} ruleStr
   * @param {Map<String, Number>} customRules
   * @returns {RuleSet}
   */
  static mapRule(ruleName, customRules) {
    console.log(`GameSim.mapRule(${ruleName}, ${customRules})`);
    switch (ruleName.toLowerCase()) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
      default:
        throw new Error(`${ruleName} Rule Set Not Defined`);
    }
  }

  //Starts the next match of a gamesim
  start() {
    console.log("GameSim.start()");
    this.matchSim.start();
    console.log(this.matchSim);
    console.log(this.matchSim.winner);
    this._winnerList.push(this.matchSim.winner);
    console.log("MatchOver");
  }

  //Swap the RuleSet to be used in the lobby
  changeRules(ruleName, customRules) {
    console.log(`GameSim.changeRules(${ruleName}, ${customRules})`);
    this.ruleSet = GameSim.mapRule(ruleName, customRules);
    this.dominoSet = new DominoSet(
      this.ruleSet.dRangeStart,
      this.ruleSet.dRangeEnd
    );
    this.board = new Board(this.dominoSet);
    this._players = new Array(this.ruleSet.playerCount);
    this.matchSim = new MatchSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this._players
    );
  }

  //Creates and returns a list of player objects based on a list of strings
  fillSeats(strArr) {
    console.log(`fillSeats(${strArr})`);
    if (strArr.length !== this.ruleSet.playerCount) {
      throw new Error("Inconsistent Player Count");
    }
    for (let i = 0; i < strArr.length; i++) {
      let visual = new Visual(this, i);
      switch (strArr[i].toLowerCase()) {
        case "human":
          this._players[i] = new HumanPlayer(i, visual);
          break;
        case "cpu":
          this._players[i] = new ComputerPlayer(i, visual);
          break;
        default:
          throw new Error("Invalid Player Type");
      }
    }
    return this._players;
  }
}
