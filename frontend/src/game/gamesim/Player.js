import Hand from "./player/Hand";
import Move from "./ruleset/action/Move";
import Draw from "./ruleset/action/Draw";
import Pass from "./ruleset/action/Pass";

/**
 * This is the connective class between
 * the game and the player. The visual
 * object repesents the UI data.
 *
 * This is what needs to connect to the socket
 */
export default class Player {
  constructor(playerId, visual) {
    this.hand = new Hand();
    this.points = 0;
    this.playerId = playerId;
    this.visual = visual;
  }

  get autoPlays() {
    throw new Error("Method not implemented");
  }

  get length() {
    return this._hand.length;
  }

  get highestDouble() {
    return this._hand.highestDouble;
  }

  get hand() {
    return this._hand;
  }

  get points() {
    return this._points;
  }

  get playerId() {
    return this._playerId;
  }

  set hand(hand) {
    this._hand = hand;
  }

  set points(points) {
    this._points = points;
  }

  set playerId(playerId) {
    this._playerId = playerId;
  }

  // Takes an object with pop and adds that item to the hand
  drawFrom(dominoes) {
    console.log(`Player.drawFrom(${dominoes})`);
    this.hand.drawFrom(dominoes);
    this.visual.handRep = this.hand.toString();
  }

  // Checks whether this player has a lighter hand than another
  lighterThan(other) {
    console.log(`Player.lighterThan(${other})`);
    return this.hand.lighterThan(other.hand);
  }

  // Clears the hand
  dropAll() {
    console.log(`Player.dropAll()`);
    this.hand.clear();
  }

  // Increment the player's points by a number
  addPoints(total) {
    console.log(`Player.addPoints(${total})`);
    this._points += total;
  }

  // Delete a domino from the player's hand
  remove(domino) {
    console.log(`Player.remove(${domino})`);
    this._hand.remove(domino);
  }

  // DO NOTHING (here for consistency)
  pass(board) {
    console.log(`Player.pass()`);
  }

  // Player plays a given move on the given board
  play(move, board) {
    console.log(`Player.play(${move}, ${board})`);
    let l1 = this.length;
    this.remove(move.domino);
    board.play(move);
    if (l1 !== this.length + 1) {
      throw new Error(`Sanity Check Fail`);
    }
  }

  // Player performs a given action on the given board
  actionToBoard(action, board) {
    switch (action.constructor) {
      case Move:
        this.play(action, board);
        break;
      case Draw:
        this.drawFrom(action, board);
        break;
      case Pass:
        this.pass();
        break;
      default:
        throw new Error("Action Undefined");
    }
  }

  // Update the player so they know there's
  // been a change in the score
  updatePlayerScore(idNum, total) {
    this.visual.updatePlayerScore(idNum, total);
  }

  // Each player has zero points
  resetScore(playerCount) {
    this.visual.score = new Array(playerCount).fill(0);
  }

  // Update the player with the information that a player
  // made a certain action
  playerActed(idNum, action) {
    console.log(`Player.playerActed(${idNum}, ${action})`);
    switch (action.constructor) {
      case Move:
        this.playerMoved(idNum, action);
        break;
      case Draw:
        this.playerDrew(idNum, action);
        break;
      case Pass:
        this.playerPassed(idNum, action);
        break;
      default:
        throw new Error("Action Undefined");
    }
    this.visual.handRep = this.hand.toString();
  }

  // Update the player with the information that a player
  // made a move
  playerMoved(idNum, move) {
    console.log(`Player.playerMoved(${idNum}, ${move})`);
    this.visual.playerMoved(idNum, move);
    // Socket Conseqence Here
  }

  // Update the player with the information that a player
  // drew a domino
  playerDrew(idNum, draw) {
    console.log(`Player.playerDrew(${idNum}, ${draw})`);
    this.visual.playerDrew(idNum, draw);
    // Socket Conseqence Here
  }

  // Update the player with the information that a player
  // passed the turn
  playerPassed(idNum, pass) {
    console.log(`Player.playerPassed(${idNum}, ${pass})`);
    this.visual.playerPassed(idNum, pass);
    // Socket Conseqence Here
  }

  // Update the visual representation of the board
  updateBoard(board) {
    this.visual.boardRep = board.lineStr;
  }

  // Update who is playing
  updatePlayingId(playingId) {
    this.visual.playingId = playingId;
  }

  // Have the player pick am action from some selection (moves is a misleading term)
  pickMove(moves) {
    throw new Error("Method Not Implemented");
  }

  toString() {
    return `Player(${this.playerId}): (${this.hand})`;
  }
}
