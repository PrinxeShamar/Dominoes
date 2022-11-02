export default class Hand {
  constructor() {
    this.dominoes = new Array(0);
  }

  get highestDouble() {
    let highest = null;
    for (let domino of this._dominoes) {
      if (domino.isDouble && (highest == null || highest.lighterThan(domino))) {
        highest = domino;
      }
    }
    return highest;
  }

  get length() {
    return this._dominoes.length;
  }

  get dominoes() {
    return [...this._dominoes];
  }

  get lightest() {
    console.log(`Hand.lightest()`);
    let domino = null;
    for (let i = 0; i < this._dominoes.length; i++) {
      //console.log(`${this.dominoes[i].toString(false)}`);
      if (domino == null || this._dominoes[i].lighterThan(domino)) {
        domino = this._dominoes[i];
      }
    }
    return domino;
  }

  get weight() {
    console.log(`Hand.weight`);
    let w = 0;
    for (let i = 0; i < this._dominoes.length; i++) {
      w += this._dominoes[i].weight;
    }
    console.log(`WEIGHT OF ${this}\n${w}`);
    return w;
  }

  set dominoes(dominoes) {
    this._dominoes = [...dominoes];
  }

  add(domino) {
    console.log(`Hand.add(${domino})`);
    if (domino == null) {
      throw new Error("Can't Add Null Domino");
    }
    this._dominoes.push(domino);
  }

  drawFrom(dominoes) {
    console.log(`Hand.drawFrom(${dominoes})`);
    this.add(dominoes.pop());
  }

  remove(domino) {
    console.log(`Hand.remove(${domino})`);
    console.log(`${this._dominoes}`);
    const index = this._dominoes.indexOf(domino);
    if (index > -1) {
      console.log(`splicing`);
      this._dominoes.splice(index, 1);
    }
    console.log(`${this._dominoes}`);
  }

  pop() {
    console.log(`Hand.pop()`);
    return this.dominoes.pop();
  }

  lighterThan(other) {
    console.log(`Hand.lighterThan(${other})`);
    if (this.length === 0) {
      return true;
    }
    if (other.length === 0) {
      return false;
    }
    const w1 = this.weight;
    const w2 = other.weight;
    if (w1 === w2) {
      return this.lightest.lighterThan(other.lightest);
    } else {
      return w1 < w2;
    }
  }

  toString() {
    return this.dominoes.toString();
  }
}
