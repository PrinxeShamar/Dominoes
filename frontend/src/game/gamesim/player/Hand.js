export default class Hand {
  constructor() {
    this.dominoes = new Array(0);
  }

  get dominoes() {
    return [this._dominoes];
  }

  get lightest() {
    console.log(`Hand.lightest()`);
    let domino = null;
    for (let i = 0; i < this.dominoes.length; i++) {
      console.log(`${this.dominoes[i].toString(false)}`);
      if (domino == null || this.dominoes[i].lighterThan(domino)) {
        domino = this.dominoes[i];
      }
    }
    return domino;
  }

  get weight() {
    console.log(`Hand.weight`);
    let w = 0;
    for (let i = 0; i < this.dominoes.length; i++) {
      console.log(`W: ${this.dominoes[i]}`);
      w += this.dominoes[i].weight;
    }
    return w;
  }

  set dominoes(dominoes) {
    this._dominoes = [...dominoes];
  }

  add(domino) {
    console.log(`Hand.add(${domino})`);
    this.dominoes.push(domino);
  }

  drawFrom(dominoes) {
    console.log(`Hand.drawFrom(${dominoes})`);
    this.add(dominoes.pop());
  }

  remove(domino) {
    console.log(`Hand.remove(${domino})`);
    const index = this.dominoes.indexOf(domino);
    if (index > -1) {
      this.dominoes.splice(index, 1);
    }
  }

  pop() {
    console.log(`Hand.pop()`);
    return this.dominoes.pop();
  }

  lighterThan(other) {
    console.log(`Hand.lighterThan(${other})`);
    let tmp = this.dominoes;
    console.log(`${tmp}`);
    for (let i = 0; i < tmp.length; i++) {
      console.log(`${tmp[0]}`);
      console.log(`${tmp[i].toString(false)}`);
    }
    if (this.weight === other.weight) {
      return this.lightest.lighterThan(other.lightest);
    }
  }
}
