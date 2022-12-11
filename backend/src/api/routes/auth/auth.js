const express = require("express");
const router = express.Router();
const User = require("../../../models/user");
const bcrypt = require("bcrypt");
const {sendResponse, httpCodes} = require("../../../modules/httpCodes");
const http = require("http");
const {isLoggedIn} = require("../../middlewares/auth");

router.post("/login", isLoggedIn(false), async function (req, res, next) {
  if (req.session.userId) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  let user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  let validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  req.session.userId = user._id;
  return sendResponse(res, httpCodes.Ok());
});

router.post("/signup", isLoggedIn(false), async function (req, res, next) {
  if (req.session.userId) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  let userExists = await User.findOne({
    username: req.body.username,
  });
  if (userExists) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  let passwordHash = await bcrypt.hash(req.body.password, 10);
  let user = new User({
    username: req.body.username,
    password: passwordHash,
  });
  await user.save();
  req.session.userId = user._id;
  return sendResponse(res, httpCodes.Ok());
});

router.post("/logout", isLoggedIn(true), function (req, res, next) {
  if (!req.session.userId) {
    return sendResponse(res, httpCodes.BadRequest());
  }
  req.session.destroy();
  return sendResponse(res, httpCodes.Ok());
});

module.exports = router;
