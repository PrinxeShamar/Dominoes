import Board from "./Board";

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
      case playerCount:
        playerCount = defPlayerCount();
      case dRangeStart:
        dRangeStart = defDRangeStart();
      case dRangeEnd:
        dRangeEnd = defDRangeEnd();
      case stopCondition:
        stopCondition = defStopCondition();
      case handSize:
        handSize = defHandSize();
      case goesLeft:
        goesLeft = defGoesLeft();
    }
  }

  defPlayerCount() {}
  defDRangeStart() {}
  defDRangeEnd() {}
  defStopCondition() {}
  defHandSize() {}
  defGoesLeft() {}

  get dRangeStart() {
    return dRangeStart;
  }

  get dRangeEnd() {
    return dRangeEnd;
  }
}
