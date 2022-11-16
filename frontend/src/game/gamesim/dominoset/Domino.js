/**
 * Acts as a single Domino.
 * The lightest side is the lowest.
 */
export default class Domino {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
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
    return this.x === this.y;
  }

  get weight() {
    return this.x + this.y;
  }

  /**
   * @param {boolean} isVisible
   */
  set visible(isVisible) {
    if (isVisible !== this.visible) {
      this.flip();
    }
  }
  /**
   * Flips the domino from one side to the other
   * (Blank side vs Numbered Side)
   * Numbered side is considered visible.
   */
  flip() {
    if (this._visible) {
      this._visible = false;
    } else {
      this._visible = true;
    }
  }

  /**
   * Returns the other side of the domino (the one
   * that's not passed in).
   * @param {Number} num
   * @returns {Number}
   */
  otherSide(num) {
    if (this.x === num) {
      return this.y;
    } else {
      return this.x;
    }
  }

  // Check if this domino is lighter than another
  lighterThan(other) {
    if (this.weigth === other.weight) {
      let otherSides = other.sides;
      return (
        (this.x < otherSides[0] && this.x < otherSides[1]) ||
        (this.y < otherSides[0] && this.y < otherSides[1])
      );
    } else {
      return this.weight < other.weight;
    }
  }

  toString(reverse) {
    if (this.isDouble) {
      return `[${this.x}]`;
    }
    if (reverse) {
      return `[${this.y}|${this.x}]`;
    } else {
      return `[${this.x}|${this.y}]`;
    }
  }
}
