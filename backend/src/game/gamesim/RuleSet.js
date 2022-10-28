import Board from "./Board";
import Player from "./Player";
import Move from "./ruleset/Move";

/**
 * RuleSet is an "interface" that reads customRules
 * so subclasses won't need to.
 */
export default class RuleSet {
  constructor(customRules) {
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

  /**
   * These methods return a default value if the
   * custom rule isn't found.
   */
  defPlayerCount() {}
  defDRangeStart() {}
  defDRangeEnd() {}
  defStopCondition() {}
  defHandSize() {}
  defGoesLeft() {}

  /**
   *
   * @param {Board} board
   * @param {Player} player
   */
  legalMoves(board, player) {}
}
