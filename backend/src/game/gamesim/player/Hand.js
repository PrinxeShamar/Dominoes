export default class Hand {
  constructor() {
    this.dominoes = [];
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
}
