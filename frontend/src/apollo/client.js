import {HttpLink, ApolloClient, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities"
import {cache} from "./cache"
import {setContext} from "@apollo/client/link/context"
import fetch from "isomorphic-fetch"
import {WebSocketLink} from "apollo-link-ws"

const httpLink = new HttpLink({  
  uri : "http://localhost:5000/graphql",
  fetch
})

const authLink = setContext((_, {headers}) => {  
  let token = null; 
  const tokenExpire = localStorage.getItem("tokenExpire");
  if(Date.now() > Date.parse(tokenExpire)){    
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpire");
  }else {
    token = localStorage.getItem("token");
  }  
  return {
    headers : {
      ...headers, 
      authorization : token ?  `Bearer ${token}` : ""
    }
  }
})

const wsLink = new WebSocketLink({
  uri : "ws://localhost:5000/graphql",
  options : {           
    reconnect: true,    
    connectionParams : {
      authToken : localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : ""
    },        
  }
})

const link = split(
  ({query}) =>  {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link ,
  cache,
  connectToDevTools : true
})

const restartWebsocketConnection = () => {    
  wsLink.subscriptionClient.tryReconnect();
}
const closeWebsocketConnection = () => {
  wsLink.subscriptionClient.close();
}

export {client , restartWebsocketConnection, closeWebsocketConnection}
