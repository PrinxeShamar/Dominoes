const express = require("express");
const router = express.Router();
const Game = require("../../../models/game");
const Lobby = require("../../../models/lobby");
const {sendResponse, httpCodes} = require("../../../modules/httpCodes");
const {isLoggedIn} = require("../../middlewares/auth");

router.get("/", async function (req, res, next) {
  let games = await this.find({});
  let gamesData = games.map(function (game) {
    return {
      name: game.name,
      title: game.title,
    };
  });
  return sendResponse(res, httpCodes.Ok(gamesData));
});

router.get("/:gameName", async function (req, res, next) {
  let game = await Game.findOne({
    name: req.params.gameName,
  });
  if (!game) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  return sendResponse(res, httpCodes.Ok({
    name: game.name,
    title: game.title,
  }));
});

router.get("/:gameName/lobbies", isLoggedIn(true), async function (req, res, next) {
  let game = await Game.findOne({
    name: req.params.gameName,
  });
  if (!game) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  let lobbies = await Lobby.find({
    game: game._id,
    started: false,
  });
  let lobbiesData = lobbies.map((lobby) => {
    return {
      id: lobby._id,
    }
  });
  return sendResponse(res, httpCodes.Ok(lobbiesData));
});

router.get("/:gameName/:lobbyId", isLoggedIn(true), async function (req, res, next) {
  return sendResponse(res, httpCodes.Ok());
});

module.exports = router;
