import { Link } from "react-router-dom";
import io from "socket.io-client";
import GameSim from "../../game/GameSim";
import logo from "../../images/logo/logo.png"

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
      <Link to="/" id="logo">
        <img src={logo} />
      </Link>
      <h1>Dominoes</h1>
      <div>
        <h2>Choose Game Mode:</h2>
        <div id="choice">
          <Link to="/draw">
            <button>Draw</button>
          </Link>
          <Link to="/block">
            <button>Block</button>
          </Link>
        </div>
      </div>
      <div>
        <h2>Rules:</h2>
        <div id="choice">
          <Link to="/rules/draw">
            <button>Draw</button>
          </Link>
          <Link to="/rules/block">
            <button>Block</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
