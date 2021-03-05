import React, {useState, useRef, useEffect} from "react";
import { FriendsListWrapper, TitleContacts, FriendsListSearch, FriendsListTitle } from "./Sidebar.styles";
import { useThemeUI } from "theme-ui";
import {
  GET_CURRENT_USER,
  GET_FRIENDS,
} from "../../apollo/operations/queries/cache";
import { useQuery } from "@apollo/client";
import FriendItem from "./FriendItem";
import {Scrollbars} from "react-custom-scrollbars"
import useLanguage from "../Global/useLanguage" 
import {FaSearch} from "react-icons/fa"

const FriendsList = ({ show }) => {
  const { colorMode } = useThemeUI();
  const [openSearch, setOpenSearch] = useState(false)
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  const {
    data: { friends },
  } = useQuery(GET_FRIENDS, { fetchPolicy: "cache-and-network" });
  const inputRef = useRef(null)
  const {i18n, lang} = useLanguage()

  useEffect(() => {
          
    if(openSearch){
      inputRef.current.focus();
    }
  },[openSearch])
  const onClickSearchButton = () => {
    inputRef.current.focus();
    setOpenSearch(true);
   
  }
  if (!friends.length) return null;
  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeightMin={0}
      autoHeightMax={200}            
    >      
    
      <FriendsListWrapper show={show} theme={colorMode}>
        <TitleContacts>
          <FriendsListTitle hide={openSearch}>{i18n.store.data[lang].translation.contacts.contactsList}</FriendsListTitle>
          <FriendsListSearch show={openSearch} theme={colorMode}>
            <input ref={inputRef} type="text" placeholder={i18n.store.data[lang].translation.controls.search} onBlur={() => setOpenSearch(false)} />
            <button onClick={onClickSearchButton}><FaSearch/></button>
          </FriendsListSearch>
        </TitleContacts>
        {friends.map((friend) => (
          <FriendItem key={friend._id} data={friend} />
        ))}        
      </FriendsListWrapper>
    </Scrollbars>
  );
};

export default FriendsList;