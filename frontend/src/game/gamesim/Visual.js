import Move from "./ruleset/action/Move";
import Draw from "./ruleset/action/Draw";
import Pass from "./ruleset/action/Pass";
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

  get observers() {
    return [this.player];
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

  // Add methods that update the player when
  // some visible hange occurs.

  announcePass(idNum, pass) {
    console.log(`Visual.announcePass(${idNum}, ${pass})`);
    if (pass.constructor !== Pass) {
      throw new Error("NOT PASS");
    }
    for (let observer of this.observers) {
      observer.playerPassed(idNum);
    }
  }

  announceDraw(idNum, draw) {
    for (let observer of this.observers) {
      observer.playerDrew(idNum, draw.fromListName);
    }
  }

  announceMove(idNum, move) {
    for (let observer of this.observers) {
      if (observer.playerId !== this._playerId) {
        observer.playerMoved(
          idNum,
          move.domino,
          move.leftRight,
          move.connectedSide
        );
      }
    }
  }

  playerActed(idNum, action) {
    // Maybe store information
  }
}
