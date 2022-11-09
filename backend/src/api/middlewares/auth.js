const {sendResponse, httpCodes} = require("../../modules/httpCodes");

function isLoggedIn(bool) {
  return function (req, res, next) {
    if (req.session.userId) {
      if (!bool) {
        return sendResponse(res, httpCodes.BadRequest());
      }
    } else {
      if (bool) {
        return sendResponse(res, httpCodes.BadRequest());
      }
    }
    return next();
  }
}

module.exports = {isLoggedIn};