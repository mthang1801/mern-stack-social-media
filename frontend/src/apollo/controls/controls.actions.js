import controlsActionTypes from "./controls.types"
import {useQuery, useReactiveVar} from "@apollo/client"
import {toggleMenuVar} from "../cache"
export const toggleMenu = () => {  
  const _toggleMenu = toggleMenuVar();  
  return toggleMenuVar(!_toggleMenu)
}

export const useToggleMenu = () => {
  const toggleMenu = useReactiveVar(toggleMenuVar);  
  return toggleMenu
}