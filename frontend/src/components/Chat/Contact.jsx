import React, { useEffect, useState } from "react";
import { Wrapper, LeftSide, RightSide } from "./styles/Chat.styles";
import {
  GET_CURRENT_USER,
  GET_FRIENDS_BY_ALPHABETA,
} from "../../apollo/operations/queries/cache";
import { FETCH_USER_FRIENDS } from "../../apollo/operations/queries/user";
import { useQuery } from "@apollo/client";
import Search from "./Search";
import { useThemeUI } from "theme-ui";
import { cacheMutations } from "../../apollo/operations/mutations";
import ListContacts from "./ListContacts";
const Contact = () => {
  //useState
  const [search, setSearch] = useState("");
  const [contactData, setContactData]= useState({});
  const [originData, setOriginData] = useState([]);
  //useQuery
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });  
  const {
    data: { friendsByAlphabeta },
  } = useQuery(GET_FRIENDS_BY_ALPHABETA, { fetchPolicy: "cache-first" });
  const { setFriendsByAlphabeta } = cacheMutations;
  const { refetch: fetchUserFriends } = useQuery(FETCH_USER_FRIENDS, {
    fetchPolicy: "cache-and-network",
    skip: true,
  });

  useEffect(() => {
    let _mounted = true;
    if (
      user &&
      fetchUserFriends &&
      setFriendsByAlphabeta &&
      !Object.entries(friendsByAlphabeta).length
    ) {
      fetchUserFriends().then(({ data }) => {       
        if (_mounted && data.fetchUserFriends) {
          const _copyUserFriends = [...data.fetchUserFriends];
          _copyUserFriends.sort((a, b) => a["name"].localeCompare(b["name"]));
          const listFriendsByAlphabeta = {};
          _copyUserFriends.forEach((friend) => {
            if (listFriendsByAlphabeta[friend.name[0].toUpperCase()]) {
              listFriendsByAlphabeta[friend.name[0].toUpperCase()].push(friend);
            } else {
              listFriendsByAlphabeta[friend.name[0].toUpperCase()] = [friend];
            }
          });
          setFriendsByAlphabeta(listFriendsByAlphabeta);
          setContactData({...listFriendsByAlphabeta});
          setOriginData(_copyUserFriends)
        }
      });
    }
    return () => _mounted = false ;
  }, [friendsByAlphabeta, user, fetchUserFriends, setFriendsByAlphabeta]);

  useEffect(() => {
    if(friendsByAlphabeta){
      if(!search){
        setContactData({...friendsByAlphabeta});
      }else{
        const searchResults = {};
        const searchRegex = new RegExp(search, "i");     
             
        for(let friend of originData){  
          if(friend["name"].match(searchRegex)){
            if(searchResults[friend["name"].charAt(0).toUpperCase()]){
              searchResults[friend["name"].charAt(0).toUpperCase()].push(friend);
            }else{
              searchResults[friend["name"].charAt(0).toUpperCase()] = [friend];
            }
          }        
        }
       setContactData({...searchResults});
      }
    }
  
  }, [search,friendsByAlphabeta, setContactData])
  

  const { colorMode } = useThemeUI();

  if (!user) return null;
  return (
    <Wrapper theme={colorMode}>
      <LeftSide theme={colorMode}>        
        <Search search={search} onChange={e => setSearch(e.target.value)}/>
        <hr />
        <ListContacts data={contactData}/>
      </LeftSide>
      <RightSide></RightSide>
    </Wrapper>
  );
};

export default Contact;
