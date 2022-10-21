function onConnection(io, socket) {
  console.log(socket);
}

function main(io) {
  io.on("connection", (socket) => {
    onConnection(io, socket);
  });
}

module.exports = main;
