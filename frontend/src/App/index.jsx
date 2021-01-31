import React, {useState} from "react" ;
import GlobalStyles from "./GlobalStyles";
import {useColorMode} from "theme-ui"
function App() {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <div>     
      <GlobalStyles/>
      <div>
      </div>
    </div>
  );
}

export default App;
