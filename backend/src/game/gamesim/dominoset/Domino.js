/**
 * Acts as a single Domino.
 * The lightest side is the lowest.
 */
export default class Domino {
  constructor(x, y) {
    this.x;
    this.y;
    if (x <= y) {
      this.x = x;
      this.y = y;
    } else {
      this.x = x;
      this.y = y;
    }
    this.visible = true;
  }

  get sides() {
    return [this.x, this.y];
  }

  get isDouble() {
    return this.x == this.y;
  }

  /**
   * @param {boolean} isVisible
   */
  set visible(isVisible) {
    if (isVisible != this.visible) {
      this.flip();
    }
  }
  /**
   * Flips the domino from one side to the other
   * (Blank side vs Numbered Side)
   * Numbered side is considered visible.
   */
  flip() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }

  /**
   * Returns the other side of the domino (the one
   * that's not passed in).
   * @param {Number} num
   * @returns {Number}
   */
  otherSide(num) {
    if (this.x == num) {
      return this.y;
    } else {
      return this.x;
    }
  }
}
