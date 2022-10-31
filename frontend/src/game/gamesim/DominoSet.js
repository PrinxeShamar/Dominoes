import Domino from "./dominoset/Domino";
export default class DominoSet {
  constructor(dRangeStart, dRangeEnd) {
    this.dominoCount = DominoSet.makeSetSize(dRangeStart, dRangeEnd);
    this.dRangeStart = dRangeStart;
    this.dRangeEnd = dRangeEnd;
    this.dominoList = Domino[this.dominoCount];
  }

  get length() {
    return this.dominoCount;
  }

  static triNum(x) {
    return Math.floor((x * (x + 1)) / 2);
  }

  static makeSetSize(start, end) {
    return DominoSet.triNum(end + 1) - DominoSet.triNum(start);
  }
}
