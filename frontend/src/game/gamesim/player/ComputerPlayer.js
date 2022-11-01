import Player from "../Player";

export default class ComputerPlayer extends Player {
  pickMove(moves, board, ruleSet) {
    //Completely random (currently)
    console.log(`ComputerPlayer.pickMove(${moves})`);
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
