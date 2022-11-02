import { Link } from "react-router-dom";
import io from "socket.io-client";
import GameSim from "../../game/GameSim";

const socket = io("http://localhost:4500");
console.log("START TEST");
let tmpGame = new GameSim("draw", new Map());
console.log("----");
console.log(tmpGame);
tmpGame.fillSeats(["cpu", "cpu", "cpu", "cpu"]);
tmpGame.start();
let players = tmpGame.players;
console.log(players);
console.log(players[0].points);
console.log(players[1].points);
console.log(players[2].points);
console.log(players[3].points);
console.log(tmpGame.winnerList);
console.log(tmpGame.winnerList[0].playerId);
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
