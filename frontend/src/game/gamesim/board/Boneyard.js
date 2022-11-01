/**
 * This functions as the face-down boneyard
 */
export default class Boneyard {
  constructor(dominoes) {
    console.log(`Boneyard(${dominoes})`);
    this.dominoes = new Array(0);
    for (let domino in dominoes) {
      this.dominoes.push(domino);
    }
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
}
