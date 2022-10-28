export default class MatchSim {
  constructor(ruleSet, dominoSet, board, players) {
    this.ruleSet = mapRule(ruleName, customRules);
    this.dominoSet = new DominoSet(
      this.ruleSet.dRangeStart,
      this.ruleSet.dRangeEnd
    );
    this.board = new Board(this.dominoSet);
    this.players = Player[this.ruleSet.playerCount];
    this.roundSim = new RoundSim(
      this.ruleSet,
      this.dominoSet,
      this.board,
      this.players
    );
  }

  /**
   * @param {String} ruleStr
   * @param {Map<String, Number>} customRules
   * @returns {RuleSet}
   */
  static mapRule(ruleStr, customRules) {
    switch (toLowerCase(ruleStr)) {
      case "draw":
        return new DrawRuleSet(customRules);
      case "block":
        return new BlockRuleSet(customRules);
    }
  }

  startRound() {
    this.matchSim.startRound();
  }
}
