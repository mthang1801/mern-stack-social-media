const { ApolloServer, mergeSchemas } = require('apollo-server-express');
const express = require('express');
const connectDB = require('./config/connectDB');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { createServer } = require('http');
const path = require('path');
const events = require('events');
const socketio = require('socket.io');
const { initSockets } = require('./socket');
const validateToken = require('./utils/validateToken');
const { User } = require('./user/user.model');
events.EventEmitter.defaultMaxListeners = Infinity;

const schemas = mergeSchemas({
  resolvers,
  schemas: [schema],
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));
if (process.env.NODE_ENV === 'production') {
  //set static
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

const server = new ApolloServer({
  schema: schemas,
  context: ({ req }) => ({ req }),
  formatError: (err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    if (!err.message) {
      err.message = 'Something went wrong from server';
    }
    return { statusCode: err.statusCode, message: err.message };
  },
});
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
const io = socketio(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
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
