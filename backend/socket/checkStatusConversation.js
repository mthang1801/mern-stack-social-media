import {pushSocketIdIntoArray, emitResponseToArray, removeSocketIdFromArray} from "./socketio.utility"

const checkStatusConversation = io => {
  let clients = {};
  io.on("connection", socket => {
    socket.on("client-send-user-info" , async user => {      
      await pushSocketIdIntoArray(clients, user._id, socket.id);        
      socket.broadcast.emit("server-send-user-online", user)              
    })
    
    socket.on("disconnect", async () => {      
      await removeSocketIdFromArray(io, clients, socket)
    })
  })
}

export {checkStatusConversation} 