function isLoggedIn(socket, next) {
  if (socket.request.session.userId) {
    return next();
  }
  return false;
}

module.exports = {isLoggedIn};