const {socketSessionMiddleware} = require("../modules/sessions");
const gameNamespace = require("./namespaces/game")
const Game = require("../models/game");

async function main(io) {
  console.log("SOCKET SERVER LAUNCHED")
  io.use(socketSessionMiddleware)

  const games = await Game.find({});
  for (const game of games) {
    gameNamespace(io.of(`/games/${game.name}`), game);
  }

  io.on("connection", (socket) => {
    console.log("Connection To Main");
    console.log(socket.request.session.userId);
  });
}

module.exports = main;
