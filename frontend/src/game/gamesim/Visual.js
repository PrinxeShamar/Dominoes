/**
 * Visual is an object that returns whatever
 * the player should have "visual" access to.
 *
 * This will store the info that will need to be
 * sent out to the frontend GUI interpreter
 */
export default class Visual {
  constructor(gamesim, playerId) {
    this.gamesim = gamesim;
    this.playerId = playerId;
  }

  get player() {
    return this.gamesim.players[this.playerId];
  }

  // Add methods that return elements for the
  // player to see.

  //Returns the string representation of the board
  get lineStr() {
    return this.gamesim.lineStr;
  }

  get handStr() {
    return this.player.hand.toString();
  }
}
