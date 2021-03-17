import {pushSocketIdIntoArray, emitResponseToArray, removeSocketIdFromArray} from "./socketio.utility"

const checkStatusConversation = io => {
  let clients = {};
  io.on("connection", socket => {
    socket.on("userId" , async userId => {
      await pushSocketIdIntoArray(clients, userId, socket.id);      
      
    })
    
    socket.on("disconnect", async () => {
      await removeSocketIdFromArray(clients, socket, socket.id)
    })
  })
}

export {checkStatusConversation} 