import { User } from "../user/user.model";

const pushSocketIdIntoArray = async (io, clients, userId, socketId) => {
  if (clients[userId]) {
    clients[userId] = clients[userId].filter((id) => {
      return io.sockets.sockets.get(id)?.connected;
    });
    clients[userId].push(socketId);
  } else {
    //update user is online
    await User.findByIdAndUpdate(userId, { isOnline: true });
    clients[userId] = [socketId];
  }
  return clients;
};

const emitResponseToArray = (io, clients, userId, eventName, data) => {
  clients[userId].forEach((socketId) => {
    try {
      io.to(socketId).emit(eventName, data);
    } catch (error) {
      console.log(error);
    }
  });
};

const removeSocketIdFromArray = async (io, clients, socket) => {
  const socketId = socket.id;
  for (let userId in clients) {
    console.log(clients);
    if (clients[userId].includes(socketId)) {
      clients[userId] = clients[userId].filter(
        (_id) => _id !== socketId && io.sockets.sockets.get(_id)?.connected
      );
      if (!clients[userId].length) {
        socket.broadcast.emit("server-send-user-is-offline", userId);
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          offlinedAt: Date.now(),
        });
        delete clients[userId];
        console.log(clients);
      }
    }
  }
  return clients;
};

export { pushSocketIdIntoArray, emitResponseToArray, removeSocketIdFromArray };
