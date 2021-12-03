const { makeExecutableSchema } = require('apollo-server-express');
const { schemaQuery } = require('./schema.query');
const { schemaType } = require('./schema.type');
const { schemaMutation } = require('./schema.mutation');
const { schemaInput } = require('./schema.input');
const { schemaEnum } = require('./schema.enum');
const { schemaSubscription } = require('./schema.subscription');
const schema = makeExecutableSchema({
  typeDefs: [
    schemaQuery,
    schemaType,
    schemaInput,
    schemaMutation,
    schemaEnum,
    schemaSubscription,
  ],
});

module.exports = schema;
