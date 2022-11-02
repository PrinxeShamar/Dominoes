import Player from "../Player";

export default class ComputerPlayer extends Player {
  pickMove(moves) {
    //Completely random (currently)
    console.log(`ComputerPlayer.pickMove(${moves})`);
    if (moves.length === 0) {
      console.log("NO MOVES, PASS!!!");
      return null;
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
