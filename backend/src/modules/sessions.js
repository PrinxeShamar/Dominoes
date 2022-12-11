const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

const expressSessionMiddleware = expressSession({
  secret: "SECRET",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://db/dominos",
  })
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

const socketSessionMiddleware = wrap(expressSessionMiddleware);

module.exports = {expressSessionMiddleware, socketSessionMiddleware}