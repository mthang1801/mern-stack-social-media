const {
  pushSocketIdIntoArray,
  emitResponseToArray,
  removeSocketIdFromArray,
} = require('./socketio.utility');

exports.checkStatusConversation = (io) => {
  let clients = {};
  io.on('connection', (socket) => {
    socket.on('client-send-user-info', async (user) => {
      await pushSocketIdIntoArray(io, clients, user._id, socket.id);
      socket.broadcast.emit('server-send-user-online', user);
      console.log(clients);
    });

    socket.on('disconnect', async () => {
      await removeSocketIdFromArray(io, clients, socket);
    });
  });
};
