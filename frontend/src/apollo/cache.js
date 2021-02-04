import {InMemoryCache, makeVar} from "@apollo/client"
import {ToggleButtonMenu, PostStatus, User} from "./models"
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
const setPostStatusVar = makeVar(PostStatus)
const setUserVar = makeVar(User);
const cache = new InMemoryCache({
  typePolicies : {
    Query : {
      fields : {
        toggleButtonMenu : {
          read : () => toggleButtonMenuVar()
        },
        postStatus : {
          read : () => setPostStatusVar()
        },
        user : {
          read : () => setUserVar()
        }
      }
    }
  }
})

export {cache, toggleButtonMenuVar, setPostStatusVar, setUserVar}