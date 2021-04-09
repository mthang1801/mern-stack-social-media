import { ApolloServer, mergeSchemas } from "apollo-server-express";
import express from "express";
import connectDB from "./config/connectDB";
import schema from "./schema";
import resolvers from "./resolvers";
import { createServer } from "http";
import path from "path";
import events from "events";
import socketio from "socket.io"
import {initSockets} from "./socket"
events.EventEmitter.defaultMaxListeners = Infinity;

const schemas = mergeSchemas({
  resolvers,
  schemas: [schema],
});
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

const server = new ApolloServer({
  schema: schemas,
  context: ({ req }) => ({req}),
  formatError: err => {
    if(!err.statusCode){
      err.statusCode = 500; 
    }
    if(!err.message){
      err.message = "Something went wrong from server";
    }
    return {statusCode : err.statusCode , message: err.message}
  }
});
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
const io = socketio(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

initSockets(io);

httpServer.listen({ port: PORT }, () => {
  connectDB()
    .then((res) => {
      console.log(`Database has been connected`);
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
      );
    })
    .catch((err) => console.log(err));
});
