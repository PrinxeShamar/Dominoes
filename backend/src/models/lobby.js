const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
  players: [mongoose.ObjectId],
  creator: mongoose.ObjectId,
  game: mongoose.ObjectId,
  started: Boolean,
});


const Lobby = mongoose.model("Lobby", lobbySchema);

module.exports = Lobby;
