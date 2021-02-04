import { ApolloServer, mergeSchemas } from "apollo-server-express";
import express from "express";
import connectDB from "./config/connectDB";
import schema from "./schema";
import resolvers from "./resolvers";
import { createServer } from "http";
import path from "path"
const schemas = mergeSchemas({
  resolvers,
  schemas: [schema],
});
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")))

const server = new ApolloServer({
  schema: schemas,
  context: ({ req }) => ({req})  
});
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
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
