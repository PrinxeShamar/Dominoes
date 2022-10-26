import Draw from "../gamemodes/draw/Draw";
import Block from "../gamemodes/block/Block";
import Gamemodes from "../gamemodes/Gamemodes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h1>Dominoes</h1>
      <Gamemodes />
    </div>
  );
}
