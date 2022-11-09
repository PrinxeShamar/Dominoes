import Move from "./ruleset/action/Move";
import Draw from "./ruleset/action/Draw";
import Pass from "./ruleset/action/Pass";
/**
 * Visual is an object that returns whatever
 * the player should have "visual" access to.
 *
 * This will store the info that will need to be
 * sent out to the frontend GUI interpreter.
 * Player fills this when updates appear,
 * and can get the values back at any time;
 *
 * Visual object has no idea what's happening
 * unless Player tells it
 *
 * Things would go straight here if it weren't for
 * things like animations
 */
export default class Visual {
  constructor(playerId) {
    this.playerId = playerId;
    this.boardRep = "";
    this.handRep = "";
    this.handSizes = [];
    this.boneyardSize = 0;
    this.score = [];
    this.playingId = -1;
  }

  get boardRep() {
    return this._boardRep;
  }

  get handRep() {
    return this._handRep;
  }

  get handSizes() {
    return [...this._handSizes];
  }

  get boneyardSize() {
    return this._boneyardSize;
  }

  get score() {
    return [...this._score];
  }

  get playingId() {
    return this._playingId;
  }

  set boardRep(boardRep) {
    this._boardRep = boardRep;
  }

  set handRep(handRep) {
    this._handRep = handRep;
  }

  set handSizes(handSizes) {
    this._handSizes = [...handSizes];
  }

  set boneyardSize(boneyardSize) {
    this._boneyardSize = boneyardSize;
  }

  set score(score) {
    this._score = [...score];
  }

  set playingId(playingId) {
    this._playingId = playingId;
  }

  get allHandSizes() {
    let tmp = new Array(this.gamesim.players.length);
    for (let i = 0; i < tmp.length; i++) {
      tmp[i] = this.gamesim.players[i].length;
    }
    return tmp;
  }

  // Add methods that update the player when
  // some visible hange occurs.

  playerPassed(idNum, pass) {
    console.log(`Visual.playerPassed(${idNum}, ${pass})`);
    // Nothing to save
  }

  playerDrew(idNum, draw) {
    console.log(`Visual.playerDrew(${idNum}, ${draw})`);
    // Hand is updated automatically, and TurnSim
    // updates the board
    this._handSizes[idNum]++;
    this._boneyardSize--;
  }

  playerMoved(idNum, move) {
    console.log(`Visual.playerMoved(${idNum}, ${move})`);
    if (idNum !== this._playingId) {
      throw new Error("Sanity Check Failed");
    }
    this._handSizes[idNum]--;
  }
}
