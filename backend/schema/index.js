import { makeExecutableSchema } from 'apollo-server-express';
import { schemaQuery } from './schema.query';
import { schemaType } from './schema.type';
import { schemaMutation } from './schema.mutation';
import { schemaInput } from './schema.input';
import { schemaEnum } from './schema.enum';
import { schemaSubscription, subscriptionActions } from './schema.subscription';
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
export { schema as default, subscriptionActions };
