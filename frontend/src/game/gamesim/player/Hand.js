export default class Hand {
  constructor() {
    this.dominoes = [];
  }

  get lightest() {
    let domino = null;
    for (let i = 0; i < this.dominoes.length; i++) {
      if (domino === null || this.dominoes[i].lighterThan(domino)) {
        domino = this.dominoes[i];
      }
    }
    return domino;
  }

  add(domino) {
    this.dominoes.push(domino);
  }

  drawFrom(dominoes) {
    this.add(dominoes.pop());
  }

  remove(domino) {
    const index = this.dominoes.indexOf(domino);
    if (index > -1) {
      this.dominoes.splice(index, 1);
    }
  }

  pop() {
    return this.dominoes.pop();
  }

  lighterThan(other) {
    if (this.weight === other.weight) {
      return this.lightest.lighterThan(other.lightest);
    }
  }
}
