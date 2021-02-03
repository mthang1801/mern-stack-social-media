import {createHttpLink, ApolloClient} from "@apollo/client";
import {cache} from "./cache"
import fetch from "isomorphic-fetch"

const link = createHttpLink({
  uri : "http://localhost:5000/graphql",
  fetch
})

const client = new ApolloClient({
  link,
  cache
})

export {client}
