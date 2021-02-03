import createToggleButtonMenuMobile from "./toggleButtonMenuMobile";
import {toggleButtonMenuMobileVar} from "../../cache"

const mutations = {
  toggleButtonMenuMobile : createToggleButtonMenuMobile(toggleButtonMenuMobileVar)
}

export {mutations}