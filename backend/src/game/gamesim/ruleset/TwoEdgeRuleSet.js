import RuleSet from "../RuleSet";

export default class TwoEdgeRuleSet extends RuleSet {
  static defPlayerCount() {
    return 4;
  }
  static defDRangeStart() {
    return 0;
  }
  static defDRangeEnd() {
    return 6;
  }
  static defStopCondition() {
    return 100;
  }
  static defHandSize() {
    return 7;
  }
  static defGoesLeft() {
    return 1;
  }
}
