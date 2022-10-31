import { Link } from "react-router-dom";
import io from "socket.io-client";
import GameSim from "../../game/GameSim";

const socket = io("http://localhost:4500");

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

let tmpGame = new GameSim("draw", new Map());
console.log("tmpGame");
console.log(tmpGame.start());
