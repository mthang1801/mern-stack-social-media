import {createHttpLink, ApolloClient} from "@apollo/client";
import {cache} from "./cache"
import {setContext} from "@apollo/client/link/context"
import fetch from "isomorphic-fetch"

const link = createHttpLink({
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

const client = new ApolloClient({
  link : authLink.concat(link),
  cache
})

export {client}
