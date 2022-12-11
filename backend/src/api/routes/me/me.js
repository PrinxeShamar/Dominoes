const express = require("express");
const router = express.Router();
const User = require("../../../models/user");
const {sendResponse, httpCodes} = require("../../../modules/httpCodes");
const {isLoggedIn} = require("../../middlewares/auth");

router.get("/", isLoggedIn(true), async function (req, res, next) {
  let user = await User.findOne({
    _id: req.session.userId,
  });
  return sendResponse(res, httpCodes.Ok({
    username: user.username,
  }));
});

module.exports = router;
