/**
 * This functions as the face-down boneyard
 */
export default class Boneyard {
  constructor(dominoes) {
    console.log(`Boneyard(${dominoes})`);
    this.dominoes = [...dominoes];
    this.shuffle();
  }

  add(domino) {
    console.log(`Boneyard.add(${domino})`);
    this.dominoes.push(domino);
  }

  pop() {
    console.log(`Boneyard.pop()`);
    console.log(this.dominoes);
    return this.dominoes.pop();
  }

  shuffle() {
    for (let i = this.dominoes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.dominoes[i], this.dominoes[j]] = [
        this.dominoes[j],
        this.dominoes[i],
      ];
    }
  }

  toString() {
    return this.dominoes.toString();
  }
}
