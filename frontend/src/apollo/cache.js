import {InMemoryCache, makeVar} from "@apollo/client"
import {ToggleButtonMenu, PostStatus} from "./models"
const toggleButtonMenuVar = makeVar(ToggleButtonMenu);
const setPostStatusVar = makeVar(PostStatus)
const cache = new InMemoryCache({
  typePolicies : {
    Query : {
      fields : {
        toggleButtonMenu : {
          read : () => toggleButtonMenuVar()
        },
        postStatus : {
          read : () => setPostStatusVar()
        }
      }
    }
  }
})

export {cache, toggleButtonMenuVar, setPostStatusVar}