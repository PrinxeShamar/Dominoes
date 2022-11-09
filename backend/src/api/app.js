const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/auth/auth");
const meRouter = require("./routes/me/me");
const gamesRouter = require("./routes/games/games");

const {expressSessionMiddleware} = require("../modules/sessions");
const {sendResponse, httpCodes} = require("../modules/httpCodes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSessionMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/me", meRouter);
app.use("/api/games", gamesRouter);

app.use(function (req, res, next) {
  sendResponse(res, httpCodes.NotFound());
});

module.exports = app;
