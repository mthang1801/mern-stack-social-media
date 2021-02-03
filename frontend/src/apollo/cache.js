import {InMemoryCache, makeVar} from "@apollo/client"
import {ToggleButtonMenuList} from "./models"
const toggleButtonMenuMobileVar = makeVar(ToggleButtonMenuList);

const cache = new InMemoryCache({
  typePolicies : {
    Query : {
      fields : {
        toggleButtonMenuMobile : {
          read : () => toggleButtonMenuMobileVar()
        }
      }
    }
  }
})

export {cache, toggleButtonMenuMobileVar}