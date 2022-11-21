const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
  board: [String],
  joinedPlayers: [{
    id: mongoose.ObjectId
  }],
  players: [{
    id: mongoose.ObjectId,
    hand: [String],
    isBot: Boolean,
  }],
  currentPlayer: mongoose.ObjectId,
  creator: mongoose.ObjectId,
  game: mongoose.ObjectId,
  started: Boolean,
  ended: Boolean,
  winner: mongoose.ObjectId,
});

const Lobby = mongoose.model("Lobby", lobbySchema);

module.exports = Lobby;
