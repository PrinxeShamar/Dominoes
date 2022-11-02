import Player from "../Player";

export default class ComputerPlayer extends Player {
  pickMove(moves) {
    //Completely random (currently)
    console.log(`ComputerPlayer.pickMove(${moves})`);
    let ans = null;
    if (moves.length === 0) {
      console.log("NO MOVES, PASS!!!");
      return ans;
    }
    ans = moves[Math.floor(Math.random() * moves.length)];
    ans = moves[0];
    ans = moves[moves.length - 1];
    return ans;
  }
}
