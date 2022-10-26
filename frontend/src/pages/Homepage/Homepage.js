import io from "socket.io-client";

const socket = io("http://localhost:4500");

import Gamemodes from "../gamemodes/Gamemodes";

export default function Homepage() {
  return (
    <div>
      <h1>Dominoes</h1>
      <Gamemodes />
    </div>
  );
}
