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

  flip() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  }
}
