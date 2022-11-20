const Game = require("../../models/game");
const {socketSessionMiddleware} = require("../../modules/sessions");
const Lobby = require("../../models/lobby");
const {isLoggedIn} = require("../middlewares/auth");
const {sendResponse, httpCodes} = require("../../modules/httpCodes");
const {GenerateHands, GenerateRandomBoard} = require("../../game/board");
const mongoose = require("mongoose");

function main(io, game) {
  io.use(socketSessionMiddleware);
  io.use(isLoggedIn);

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
        };
      });
      response(httpCodes.Ok(lobbiesData));
    });

    socket.on("lobby:create", async () => {
      let lobby = new Lobby({
        creator: socket.request.session.userId,
        game: game._id,
        started: false,
      });
      await lobby.save();
      io.to("lobbies").emit("lobby:created", {
        id: lobby._id,
      });
    });

    function getLobbyData(lobby, userId) {
      let lobbyData = {
        id: lobby._id,
        joinedPlayers: [],
        board: [],
        players: [],
        creator: lobby.creator,
        started: lobby.started,
        currentPlayer: lobby.currentPlayer,
      };

      if (lobby.started) {
        lobbyData.board = [...lobby.board];
        for (let player of lobby.players) {
          let playerData = {
            id: player.id,
            hand: [],
            isMe: player.id.toString() === userId.toString(),
          };
          if (player.id.toString() === userId.toString()) {
            playerData.hand = [...player.hand];
          } else {
            for (let _ in player.hand) {
              playerData.hand.push("");
            }
          }
          lobbyData.players.push(playerData);
        }
      } else {
        for (let player of lobby.joinedPlayers) {
          let playerData = {
            id: player.id,
            isMe: player.id.toString() === userId.toString(),
          };
          lobbyData.joinedPlayers.push(playerData);
        }
      }
      return lobbyData;
    }

    socket.on("lobby:join", async (lobbyId, response) => {
      // Find lobby.
      let lobby = await Lobby.findOne({
        _id: lobbyId,
      });
      if (!lobby) {
        return response(httpCodes.NotFound());
      }

      // Deny access if lobby is started and the current player isn't already in game.
      let isPlayer = lobby.players.find((player) => {
        return player.id.toString() === socket.request.session.userId.toString();
      });
      if (lobby.started && !isPlayer) {
        return response(httpCodes.Forbidden());
      }

      // Send player joined event.
      socket.join(`lobby:${lobby._id}`);
      let player = lobby.joinedPlayers.find((player) => {
        return player.id.toString() === socket.request.session.userId.toString();
      });
      if (!player) {
        let player = {
          id: socket.request.session.userId,
        };
        lobby.joinedPlayers.push(player);
        await lobby.save();
        io.to(`lobby:${lobby._id}`).emit("lobby:player:joined", {
          id: player.id,
        });
      }

      return response(JSON.stringify(httpCodes.Ok(getLobbyData(
        lobby,
        socket.request.session.userId
      ))));
    });

    function play(lobby, userId, domino, side) {
      let isPlayer = lobby.players.find((player) => {
        return player.id.toString() === userId.toString();
      });
      if (!isPlayer) {
        return response(httpCodes.Forbidden());
      }

      let isCurrentPlayer = lobby.currentPlayer.toString() === socket.request.session.userId.toString();
      if (!isCurrentPlayer) {
        return response(httpCodes.BadRequest());
      }

      let newBoard = [...lobby.board]
      if (side === "L") {
        let side = newBoard[0][0];
        if (domino[0] === side) {
          newBoard.unshift(`${domino[1]}${domino[0]}`);
        } else if (domino[1] === side) {
          newBoard.unshift(domino);
        } else {
          return response(httpCodes.BadRequest())
        }
      } else if (side === "R") {
        let side = newBoard[newBoard.length - 1][1];
        if (domino[0] === side) {
          newBoard.push(domino);
        } else if (domino[1] === side) {
          newBoard.push(`${domino[1]}${domino[0]}`);
        } else {
          return response(httpCodes.BadRequest())
        }
      } else {
        return response(httpCodes.BadRequest())
      }

      let currentPlayerIndex = 0;
      for (let playerIndex = 0; playerIndex < lobby.players.length; playerIndex++) {
        let player = lobby.players[playerIndex];
        if (player.id.toString() === lobby.currentPlayer.toString()) {
          let dominoIndex = player.hand.findIndex((playerDomino) => {
            return playerDomino === domino;
          })
          if (dominoIndex >= 0) {
            player.hand.splice(dominoIndex, 1);
          } else {
            return response(httpCodes.BadRequest());
          }
          currentPlayerIndex = playerIndex;
          break;
        }
      }

      lobby.board = newBoard;
      lobby.currentPlayer = lobby.players[(currentPlayerIndex + 1) % lobby.players.length].id;

      return httpCodes.Ok();
    }

    function runBots(lobby) {
      let currentPlayerIndex = lobby.players.findIndex((player) => {
        return player.id.toString() === lobby.currentPlayer.toString();
      })
      for (let i = 0; i < lobby.players.length; i++) {
        let index = (i + currentPlayerIndex) % lobby.players.length;
        let player = lobby.players[index];
        if (!lobby.players[index].isBot) {
          lobby.currentPlayer = player.id;
          break;
        }
        for (let domino of player.hand) {
          let leftSide = lobby.board[0][0];
          let rightSide = lobby.board[lobby.board.length - 1][1];
          if (domino[0] === leftSide || domino[1] === leftSide) {
            play(lobby, player.id, domino, "L");
            break;
          } else if (domino[0] === rightSide || domino[0] === rightSide) {
            play(lobby, player.id, domino, "R");
            break;
          }
        }
      }
    }

    socket.on("lobby:start", async (lobbyId) => {
      // Find lobby.
      let lobby = await Lobby.findOne({
        _id: lobbyId,
      });
      if (!lobby) {
        return response(httpCodes.NotFound());
      }

      // Check if lobby is already started.
      if (lobby.started) {
        return response(httpCodes.BadRequest());
      }

      // Only lobby creator can start game.
      let isCreator =
        lobby.creator.toString() === socket.request.session.userId.toString();
      if (!isCreator) {
        return response(httpCodes.Forbidden());
      }

      lobby.started = true;

      // Generate player hands.
      let board = GenerateRandomBoard();
      let hands = GenerateHands(board, 4);

      for (let i = 0; i < 4; i++) {
        let player = lobby.joinedPlayers[i] || {id: new mongoose.Types.ObjectId(), isBot: true};
        if (!player.isBot) {
          lobby.players.push({
            id: player.id,
            hand: hands[i],
            isBot: player.isBot || false,
          });
        }
      }

      let doubleSixPlayer = 0;
      for (let player = 0; player < lobby.players.length; player++) {
        let hasDoubleSix = lobby.players[player].hand.findIndex((domino) => {
          return domino === "66";
        });
        if (hasDoubleSix >= 0) {
          lobby.players[player].hand.splice(hasDoubleSix, 1);
          doubleSixPlayer = player;
          break;
        }
      }
      lobby.board.push("66");
      lobby.currentPlayer = lobby.players[(doubleSixPlayer + 1) % lobby.players.length].id;

      // runBots(lobby);

      await lobby.save();

      let roomSockets = io.adapter.rooms.get(`lobby:${lobbyId}`);
      for (let roomSocketId of roomSockets) {
        let roomSocket = io.sockets.get(roomSocketId);
        let lobbyData = getLobbyData(
          lobby,
          roomSocket.request.session.userId
        );
        roomSocket.emit("lobby:update", lobbyData);
      }
    });

    socket.on("lobby:play", async (lobbyId, domino, side, response) => {
      let lobby = await Lobby.findOne({
        _id: lobbyId,
      });
      if (!lobby) {
        return response(httpCodes.NotFound());
      }

      if (!lobby.started) {
        return response(httpCodes.BadRequest());
      }

      // console.log(JSON.stringify(lobby, null, 4));

      let res = play(lobby, socket.request.session.userId, domino, side);
      if (res.result !== "success") {
        return response(res);
      }

      // runBots(lobby);

      await lobby.save();

      // console.log(JSON.stringify(lobby, null, 4));

      let roomSockets = io.adapter.rooms.get(`lobby:${lobbyId}`);
      console.log(roomSockets);
      for (let roomSocketId of roomSockets) {
        let roomSocket = io.sockets.get(roomSocketId);
        let lobbyData = getLobbyData(
          lobby,
          roomSocket.request.session.userId
        );
        roomSocket.emit("lobby:update", lobbyData);
      }
    })

    socket.on("disconnecting", async () => {
      // Get rooms player is in.
      let rooms = socket.rooms;
      for (let room of rooms) {
        // Check if room is a game lobby.
        let isLobbyRoom = /lobby:[0-9]*/.test(room);
        if (isLobbyRoom) {
          // Check how many connected sockets a user has in a room.
          let userSocketCount = 0;
          let roomSockets = io.adapter.rooms.get(room);
          for (let roomSocketId of roomSockets) {
            let roomSocket = io.sockets.get(roomSocketId);
            if (
              socket.request.session.userId.toString() ===
              roomSocket.request.session.userId.toString()
            ) {
              userSocketCount++;
            }
          }
          if (userSocketCount <= 1) {
            // Remove player from joinedPlayers array if this is the last socket leaving.
            let lobbyId = room.slice(6);
            let lobby = await Lobby.findOne({
              _id: lobbyId,
            });
            let playerIndex = lobby.joinedPlayers.findIndex((player) => {
              return (
                player.id.toString() === socket.request.session.userId.toString()
              );
            });
            if (playerIndex >= 0) {
              lobby.joinedPlayers.splice(playerIndex, 1);
            }
            await lobby.save();
            io.to(`lobby:${lobby._id}`).emit("lobby:player:left", {
              id: socket.request.session.userId,
            });
          }
        }
      }
    });
  });
}

module.exports = main;
