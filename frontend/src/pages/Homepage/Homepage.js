import io from "socket.io-client";
import Gamemodes from "../gamemodes/Gamemodes";

const socket = io("http://localhost:4500");

export default function Homepage() {
  return (
    <div>
      <h1>Dominoes</h1>
      <Gamemodes />
    </div>
  );
}
