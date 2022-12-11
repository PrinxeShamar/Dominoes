const mongoose = require("mongoose");
const Lobby = require("../../models/lobby");
const {httpCodes} = require("../../modules/httpCodes");

class Player {
  constructor(id) {
    this.id = id;
    this.online = false;
  }

  getPlayerData(isUser) {
    return {
      id: this.id,
    }
  }
}

class Lobby {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.started = false;
    this.joinedPlayers = [];
  }

  getLobbyData(userId) {
    let gameData = {
      id: this.id,
      players: [],
    }
    gameData.players = this.players.map((player) => {
      return player.getPlayerData(userId.toString() === player.id.toString());
    })
  }

  addPlayer(userId) {
    let player = getPlayer(userId);
    if (player) {
      return player;
    }

    let newPlayer = new Player(socket.request.session.userId);
    this.players.push(newPlayer);
    return newPlayer;
  }

  getPlayer(userId) {
    return this.players.find((player) => {
      return player.id.toString() === userId.toString();
    })
  }

  getPlayerIndex(userId) {
    return this.players.findIndex((player) => {
      return player.id.toString() === userId.toString();
    })
  }

  removePlayer(userId) {
    let playerIndex = this.getPlayerIndex(userId);
    if (playerIndex >= 0) {
      this.players.splice(playerIndex, 1);
    }
  }
}

let lobbies = {};

function main(io) {
  io.on("connection", (socket) => {

    socket.on("lobby:get", async (response) => {
      socket.join("lobbies");
      let lobbiesData = lobbies.map((lobby) => {
        return lobby.getLobbyData();
      });
      response(httpCodes.Ok(lobbiesData));
    });

    socket.on("lobby:create", async () => {
      let lobby = new Lobby({
        id: new mongoose.Types.ObjectId(),
        creator: socket.request.session.userId,
      });
      lobbies[lobby.id] = lobby;
      io.to("lobbies").emit("lobby:created", lobby.getLobbyData(socket.request.session.userId));
    });

    socket.on("lobby:join", async (lobbyId, response) => {
      let lobby = lobbies[lobbyId];
      if (!lobby) {
        return response(httpCodes.NotFound());
      }

      let player;
      if (lobby.started) {
        player = lobby.getPlayer(socket.request.session.userId);
        if (!player) {
          return response(httpCodes.NotFound());
        }
      } else {
        player = lobby.addPlayer(socket.request.session.userId);
      }
      player.online = true;

      socket.join(`lobby:${lobby._id}`);

      if (!player) {
        let player = {
          id: socket.request.session.userId,
        };
        lobby.joinedPlayers.push(player);
        await lobby.save();
        io.to(`lobby:${lobby._id}`).emit("lobby:update", getLobbyData(
          lobby,
          socket.request.session.userId,
          socket.request.session.userId,
        ));
      }

      return response(JSON.stringify(httpCodes.Ok(getLobbyData(
        lobby,
        socket.request.session.userId,
        socket.request.session.userId,
      ))));
    });

  })
}