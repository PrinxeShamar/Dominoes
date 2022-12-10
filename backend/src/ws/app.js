const {socketSessionMiddleware} = require("../modules/sessions");
const gameNamespace = require("./namespaces/game")
const Game = require("../models/game");

async function main(io) {
  console.log("SOCKET SERVER LAUNCHED")
  io.use(socketSessionMiddleware)

  gameNamespace(io.of(`/games/block`), {
    name: "block",
  });

  io.on("connection", (socket) => {
    console.log("Connection To Main");
    console.log(socket.request.session.userId);
  });
}

module.exports = main;
