import Action from "../Action";

export default class Draw extends Action {
  constructor(fromListName, dominoList) {
    super();
    this.fromListName = fromListName;
    this.dominoList = dominoList;
  }

  get fromListName() {
    return this._fromListName;
  }

  get dominoList() {
    return this._dominoList;
  }

  set fromListName(fromListName) {
    this._fromListName = fromListName;
  }

  set dominoList(dominoList) {
    this._dominoList = dominoList;
  }

  toString() {
    return `Draw(${this.fromListName}, ${this.dominoList})`;
  }
}
