/**
 * RuleSet is an "interface" that reads customRules
 * so subclasses won't need to.
 */
export default class RuleSet {
  constructor(customRules) {
    if (this.constructor === RuleSet)
      throw new Error("Interface can't be instantiated");

    this.playerCount = customRules.get("playerCount");
    this.dRangeStart = customRules.get("dRangeStart");
    this.dRangeEnd = customRules.get("dRangeEnd");
    this.stopCondition = customRules.get("stopCondition");
    this.handSize = customRules.get("handSize");
    this.goesLeft = customRules.get("goesLeft");
    if (undefined === this.playerCount)
      this.playerCount = this.defPlayerCount();
    if (undefined === this.dRangeStart)
      this.dRangeStart = this.defDRangeStart();
    if (undefined === this.dRangeEnd) this.dRangeEnd = this.defDRangeEnd();
    if (undefined === this.stopCondition)
      this.stopCondition = this.defStopCondition();
    if (undefined === this.handSize) this.handSize = this.defHandSize();
    if (undefined === this.goesLeft) this.goesLeft = this.defGoesLeft();
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
  defPlayerCount() {
    throw new Error("Method Not Implemented");
  }
  defDRangeStart() {
    throw new Error("Method Not Implemented");
  }
  defDRangeEnd() {
    throw new Error("Method Not Implemented");
  }
  defStopCondition() {
    throw new Error("Method Not Implemented");
  }
  defHandSize() {
    throw new Error("Method Not Implemented");
  }
  defGoesLeft() {
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
