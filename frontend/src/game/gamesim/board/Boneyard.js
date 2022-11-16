/**
 * This functions as the face-down boneyard
 */
export default class Boneyard {
  constructor(dominoes) {
    console.log(`Boneyard(${dominoes})`);
    this.dominoes = [...dominoes];
    this.shuffle();
  }

  //Add the domino to the boneyard
  add(domino) {
    console.log(`Boneyard.add(${domino})`);
    this.dominoes.push(domino);
  }

  //Remove a domino from the boneyard and return it
  pop() {
    console.log(`Boneyard.pop()`);
    console.log(this.dominoes);
    return this.dominoes.pop();
  }

  //Randomize the order of the list of dominoes
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
