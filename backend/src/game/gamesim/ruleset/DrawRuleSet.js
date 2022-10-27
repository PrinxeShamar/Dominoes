import RuleSet from "../RuleSet";
export default class DrawRuleSet extends RuleSet {
  defPlayerCount() {
    return 4;
  }
  defDRangeStart() {
    return 0;
  }
  defDRangeEnd() {
    return 6;
  }
  defStopCondition() {
    return 100;
  }
  defHandSize() {
    return 7;
  }
  defGoesLeft() {
    return 1;
  }
}
