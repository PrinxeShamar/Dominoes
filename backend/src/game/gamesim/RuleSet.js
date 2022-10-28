import Board from "./Board";
import Player from "./Player";
import Move from "./ruleset/Move";

/**
 * RuleSet is an "interface" that reads customRules
 * so subclasses won't need to.
 */
export default class RuleSet {
  constructor(customRules) {
    if (this.constructor == RuleSet) {
      throw new Error("Interface can't be instantiated");
    }
    this.playerCount = customRules.get("playerCount");
    this.dRangeStart = customRules.get("dRangeStart");
    this.dRangeEnd = customRules.get("dRangeEnd");
    this.stopCondition = customRules.get("stopCondition");
    this.handSize = customRules.get("handSize");
    this.goesLeft = customRules.get("goesLeft");
    switch (undefined) {
      case this.playerCount:
        this.playerCount = defPlayerCount();
      case this.dRangeStart:
        this.dRangeStart = defDRangeStart();
      case this.dRangeEnd:
        this.dRangeEnd = defDRangeEnd();
      case this.stopCondition:
        this.stopCondition = defStopCondition();
      case this.handSize:
        this.handSize = defHandSize();
      case this.goesLeft:
        this.goesLeft = defGoesLeft();
    }
  }

  get dRangeStart() {
    return this.dRangeStart;
  }

  get dRangeEnd() {
    return this.dRangeEnd;
  }

  get playerCount() {
    return this.playerCount;
  }

  /**
   * These methods return a default value if the
   * custom rule isn't found.
   */
  static defPlayerCount() {
    throw new Error("Method Not Implemented");
  }
  static defDRangeStart() {
    throw new Error("Method Not Implemented");
  }
  static defDRangeEnd() {
    throw new Error("Method Not Implemented");
  }
  static defStopCondition() {
    throw new Error("Method Not Implemented");
  }
  static defHandSize() {
    throw new Error("Method Not Implemented");
  }
  static defGoesLeft() {
    throw new Error("Method Not Implemented");
  }

  /**
   * This returns a set of legal moves, which may
   * be empty.
   * @param {Board} board
   * @param {Player} player
   */
  legalMoves(board, player) {
    throw new Error("Method Not Implemented");
  }

  /**
   * The plays a move on the board, updating
   * the board's data depending on the rules
   * @param {Board} board
   * @param {Move} move
   */
  play(board, move) {
    throw new Error("Method Not Implemented");
  }
}
