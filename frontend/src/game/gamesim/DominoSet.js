import Domino from "./dominoset/Domino";
export default class DominoSet {
  constructor(dRangeStart, dRangeEnd) {
    console.log(`DominoSet(${dRangeStart}, ${dRangeEnd})`);
    this.dominoCount = DominoSet.makeSetSize(dRangeStart, dRangeEnd);
    this.dRangeStart = dRangeStart;
    this.dRangeEnd = dRangeEnd;
    this.dominoList = new Array(this.dominoCount);
    this.generateSet();
  }

  get length() {
    return this.dominoCount;
  }

  get dominoes() {
    return this.dominoList;
  }

  static triNum(x) {
    return Math.floor((x * (x + 1)) / 2);
  }

  static makeSetSize(start, end) {
    return DominoSet.triNum(end + 1) - DominoSet.triNum(start);
  }

  generateSet() {
    console.log(`DominoSet.generateSet()`);
    let index = 0;
    for (let i = this.dRangeStart; i <= this.dRangeEnd; i++) {
      for (let j = i; j <= this.dRangeEnd; j++) {
        this.dominoList[index] = new Domino(i, j);
        ++index;
      }
    }
    /*
    for (let i = 0; i < index; i++) {
      let tmp = this.dominoList[i];
      console.log(tmp.toString(false));
    }*/
  }
}