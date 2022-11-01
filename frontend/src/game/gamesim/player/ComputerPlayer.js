import Player from "../Player";

export default class ComputerPlayer extends Player {
  pickMove(moves) {
    //Completely random (currently)
    console.log(`ComputerPlayer.pickMove(${moves})`);
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
