import Player from "../Player";

export default class ComputerPlayer extends Player {
  get autoPlays() {
    return true;
  }

  pickMove(moves) {
    //Completely random (currently)
    console.log(`ComputerPlayer.pickMove(${moves})`);
    let ans = null;
    if (moves.length === 0) {
      throw new Error("There's Nothing To Pick");
    }
    //ans = moves[Math.floor(Math.random() * moves.length)];
    //ans = moves[0];
    ans = moves[moves.length - 1];
    console.log(`${ans} is my move`);
    return ans;
  }
}
