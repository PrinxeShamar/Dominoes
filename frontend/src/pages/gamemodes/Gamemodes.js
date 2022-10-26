import Draw from "./draw/Draw";
import Block from "./block/Block";
import { Routes, Route, Link } from "react-router-dom";

export default function Gamemodes() {
  return (
    <div>
      <h2>Choose Game Mode:</h2>
      <Link to="/">Draw</Link>
      <Link to="block">Block</Link>
      <Routes>
        <Route path="/" element={<Draw />} />
        <Route path="block" element={<Block />} />
      </Routes>
    </div>
  );
}
