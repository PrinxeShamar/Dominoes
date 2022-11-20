import { Link } from "react-router-dom";
import io from "socket.io-client";
import GameSim from "../../game/GameSim";
import logo from "../../images/logo/logo.png";
import ModeMenu from "../../components/ModeMenu";

const socket = io("http://localhost:4500");
console.log("START TEST");

export default function Homepage() {
  function demo1() {
    window.confirm("Open TestFlowChanges Branch");
    /**
    let tmpMap = null;
    let tmpGame = null;
    let players = null;
    let userIn = null;
    let userBool = null;
    let score = null;

    tmpMap = new Map();
    tmpGame = new GameSim("draw", tmpMap);
    console.log("----");
    console.log(tmpGame);
    tmpGame.fillSeats(["human", "cpu", "cpu", "cpu"]);
    tmpGame.start();
    console.log("We Passed Start!");
    console.log(tmpGame.running);
    while (tmpGame.running) {
      console.log("The game is running");
      tmpGame.playerActs(tmpGame.playing.playerId, 0);
    }
    console.log(tmpGame.winnerList);
    console.log(tmpGame.winnerList[0].playerId);
    console.log("DONE WITH DEMO 0");
    userBool = true;
    while (userBool) {
      userBool = window.confirm(
        `Player ${tmpGame.winnerList[0].playerId} wins!\nHit 'cancel' to stop`
      );
    }
    */
  }

  function demo2() {
    window.confirm("Open TestFlowChanges Branch");
    /**
    let tmpMap = null;
    let tmpGame = null;
    let players = null;
    let userIn = null;
    let userBool = null;
    let score = null;

    tmpMap = new Map();
    tmpGame = new GameSim("block", tmpMap);
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
    userBool = true;
    score = new Array(players.length);
    for (let i = 0; i < players.length; i++) {
      score[i] = players[0].points;
    }
    while (userBool) {
      userBool = window.confirm(
        `Player ${tmpGame.winnerList[0].playerId} wins!\nHit 'cancel' to stop`
      );
    }
    */
  }

  function demo3() {
    window.confirm("Open TestFlowChanges Branch");
    /**
    let tmpMap = null;
    let tmpGame = null;
    let players = null;
    let userIn = null;
    let userBool = null;
    let score = null;

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
    userBool = true;
    score = new Array(players.length);
    for (let i = 0; i < players.length; i++) {
      score[i] = players[0].points;
    }
    while (userBool) {
      userBool = window.confirm(
        `Player ${tmpGame.winnerList[0].playerId} wins!\nHit 'cancel' to stop`
      );
    }
    */
  }

  function demo4() {
    window.confirm("Open TestFlowChanges Branch");
    /**
    let tmpMap = null;
    let tmpGame = null;
    let players = null;
    let userIn = null;
    let userBool = null;
    let score = null;

    tmpMap = new Map();
    tmpGame = new GameSim("block", tmpMap);
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
    userBool = true;
    score = new Array(players.length);
    for (let i = 0; i < players.length; i++) {
      score[i] = players[0].points;
    }
    while (userBool) {
      userBool = window.confirm(
        `Player ${tmpGame.winnerList[0].playerId} wins!\nHit 'cancel' to stop`
      );
    }
    */
  }

  return (
    <div>
      <Link to="/" id="logo">
        <img src={logo} />
      </Link>
      <h1>Dominoes</h1>
      <div>
        <h2>Play vs Computer:</h2>
        <div id="choice">
          <Link to="/draw">
            <button onClick={demo1}>Draw</button>
          </Link>
          <Link to="/block">
            <button onClick={demo2}>Block</button>
          </Link>
        </div>
      </div>
      <div>
        <h2>Pass and Play:</h2>
        <div id="choice">
          <Link to="/draw">
            <button onClick={demo3}>Draw</button>
          </Link>
          <Link to="/block">
            <button onClick={demo4}>Block</button>
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
