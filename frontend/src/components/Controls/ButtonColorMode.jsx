import React from "react"
import { useColorMode } from "theme-ui"
import Switch from "react-switch"
import sun from "../../assets/images/sun.png"
import moon from "../../assets/images/moon.png"

const iconCss = [{ pointerEvents: `none`, margin: 4 }]

const checkedIcon = (
  <img
    alt="moon indicating dark mode"
    src={moon}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

const uncheckedIcon = (
  <img
    alt="sun indicating light mode"
    src={sun}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

const ButtonColorMode = () => {
  const [colorMode, setColorMode] = useColorMode()
  return (    
      <Switch
        arial-label="Toggle dark mode"
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        checked={colorMode === "dark"}
        onChange={() =>
          setColorMode(prevState => (prevState === "dark" ? "default" : "dark"))
        }
        height={24}
        width={48}
        handleDiameter={24}
        onHandleColor={"#1e88e5"} 
        offHandleColor={"#ffd600"}       
        offColor="#3949ab"
        onColor="#6200ea"
        boxShadow="inset 0 0 0 1px #000"   
      />    
  )
}

export default ButtonColorMode
