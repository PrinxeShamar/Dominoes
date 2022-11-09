import { Link } from "react-router-dom";
import io from "socket.io-client";
import GameSim from "../../game/GameSim";

const socket = io("http://localhost:4500");
console.log("START TEST");

let tmpMap = null;
let tmpGame = null;
let players = null;
let userIn = null;
while (userIn == null) {
  userIn = prompt(
    `Choose (0-2):\n0: Bot Demo\n1: Pass & Play\n2: Skip To Website`
  );
  switch (userIn) {
    case "0":
      tmpMap = new Map();
      tmpGame = new GameSim("draw", tmpMap);
      console.log("----");
      console.log(tmpGame);
      tmpGame.fillSeats(["human", "cpu", "cpu", "cpu"]);
      tmpGame.start();
      players = tmpGame.players;
      console.log(players);
      console.log(players[0].points);
      console.log(players[1].points);
      console.log(players[2].points);
      console.log(players[3].points);
      console.log(tmpGame.winnerList);
      console.log(tmpGame.winnerList[0].playerId);
      console.log("DONE WITH DEMO 0");
      break;
    case "1":
      tmpMap = new Map();
      tmpGame = new GameSim("draw", tmpMap);
      console.log("----");
      console.log(tmpGame);
      tmpGame.fillSeats(["human", "cpu", "human", "cpu"]);
      tmpGame.start();
      players = tmpGame.players;
      console.log(players);
      console.log(players[0].points);
      console.log(players[1].points);
      console.log(players[2].points);
      console.log(players[3].points);
      console.log(tmpGame.winnerList);
      console.log(tmpGame.winnerList[0].playerId);
      console.log("DONE WITH DEMO 1");
      break;
    case "2":
      break;
    default:
      userIn = null;
  }
}
export default function Homepage() {
  return (
    <div>
      <h1>Dominoes</h1>
      <div>
        <h2>Choose Game Mode:</h2>
        <Link to="/draw">Draw</Link>
        <Link to="/block">Block</Link>
      </div>
      <div>
        <h2>Rules:</h2>
        <Link to="/rules/draw">Draw</Link>
        <Link to="/rules/block">Block</Link>
      </div>
    </div>
  );
}
