import React from "react";
import {SearchForm} from "./styles/Search.styles";
import { FaSearch } from "react-icons/fa";
import {useThemeUI} from "theme-ui"
const Search = ({...props}) => {  
  const {colorMode} = useThemeUI()
  return (
    <SearchForm theme={colorMode}>
      <input
        type="text"       
        placeholder="Search..."
      />
      <button
        type="button"                
      >
        <FaSearch />
      </button>
    </SearchForm>
  );
};

export default Search;
