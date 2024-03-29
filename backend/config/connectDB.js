const mongoose = require('mongoose');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

// const uri = `mongodb://${host}:${port}/${database}`;
const uri = process.env.DB_URI;
module.exports = () =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
