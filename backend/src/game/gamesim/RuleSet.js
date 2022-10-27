export default class RuleSet {
  constructor(customRules) {
    this.playerCount = customRules.get("playerCount");
    this.dRangeStart = customRules.get("dRangeStart");
    this.dRangeEnd = customRules.get("dRangeEnd");
    this.stopCondition = customRules.get("stopCondition");
    this.handSize = customRules.get("handSize");
    varCleanUp();
  }

  varCleanUp() {}

  get dRangeStart() {
    return dRangeStart;
  }

  get dRangeEnd() {
    return dRangeEnd;
  }
}
