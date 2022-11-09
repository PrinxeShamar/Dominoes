const Game = require("../../models/game");
const {socketSessionMiddleware} = require("../../modules/sessions");
const Lobby = require("../../models/lobby")
const {isLoggedIn} = require("../middlewares/auth");
const {sendResponse, httpCodes} = require("../../modules/httpCodes");

function main(io, game) {
  io.use(socketSessionMiddleware)
  io.use(isLoggedIn)

  io.on("connection", (socket) => {
    console.log(`Connection To Game - ${socket.request.session.userId}`);

    socket.on("lobby:get", async (response) => {
      socket.join("lobbies");
      let lobbies = await Lobby.find({
        game: game._id,
        started: false,
      });
      let lobbiesData = lobbies.map((lobby) => {
        return {
          id: lobby._id,
        }
      });
      response(httpCodes.Ok(lobbiesData));
    })

    socket.on("lobby:create", async () => {
      let lobby = new Lobby({
        creator: socket.request.session.userId,
        game: game._id,
        started: false,
      });
      await lobby.save();
      io.to("lobbies").emit("lobby:created", {
        id: lobby._id,
      })
    })

    socket.on("lobby:join", async (lobbyId, response) => {
      socket.join(`lobby:${lobby._id}`);
      let lobby = await Lobby.findOne({
        _id: lobbyId,
      });
      if (!lobby) {
        return response(httpCodes.NotFound());
      }
      let player = lobby.players.find((player) => {
        return player.equals(socket.request.session.userId);
      })
      if (!player) {
        lobby.players.push(socket.request.session.userId);
        await lobby.save();
        io.to(`lobby:${lobby._id}`).emit("lobby:joined", {
          id: lobby._id,
          players: lobby.players,
        })
      }
      return response(httpCodes.Ok({
        id: lobby._id,
        players: lobby.players,
      }))
    })

    socket.on('disconnecting', async () => {
      let rooms = socket.rooms;
      for (let room of rooms) {
        let isLobbyRoom = /lobby:[0-9]*/.test(room);
        if (isLobbyRoom) {
          let userSocketCount = 0;
          let roomSockets = io.adapter.rooms.get(room);
          for (let roomSocketId of roomSockets) {
            let roomSocket = io.sockets.get(roomSocketId);
            if (socket.request.session.userId.toString() === roomSocket.request.session.userId.toString()) {
              userSocketCount++;
            }
          }
          if (userSocketCount <= 1) {
            let lobbyId = room.slice(6);
            let lobby = await Lobby.findOne({
              _id: lobbyId,
            });
            let playerIndex = lobby.players.findIndex((player) => {
              return player.toString() === socket.request.session.userId.toString();
            })
            if (playerIndex >= 0) {
              lobby.players.splice(playerIndex, 1)
            }
            await lobby.save();
            io.to(`lobby:${lobby._id}`).emit("lobby:left", {
              id: lobby._id,
              players: lobby.players,
            })
          }
        }
      }
    });

  })
}

module.exports = main;