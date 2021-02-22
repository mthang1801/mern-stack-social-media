import React, {useEffect, useState} from "react";
import { Wrapper, LeftSide, RightSide } from "./personal-posts.styles";
import BoxCreatePost from "../components/Post/BoxCreatePost/BoxCreatePost";
import Posts from "../components/Post/Posts";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_CURRENT_PERSONAL_USER,
  GET_PERSONAL_POSTS,
  FETCH_POSTS
} from "../apollo/operations/queries";
import IntroductionBox from "../components/Personal/IntroductionBox";
import mutations from "../apollo/operations/mutations"
const PersonalPosts = () => {
  const [loadingMore, setLoadingMore] = useState(false)
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { personalPosts },
  } = useQuery(GET_PERSONAL_POSTS, { fetchPolicy: "cache-first" });
  
  const { refetch : fetchMorePosts} = useQuery(FETCH_POSTS, {skip : true, fetchPolicy : "cache-and-network"} )
  const {setPersonalPosts} = mutations
  useEffect(() => {
    window.addEventListener("scroll" , () => {
      const docEl = document.documentElement ; 
      if(docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.75){      
        setLoadingMore(true);
      }
    })
  },[])
  
  useEffect(() => {   
    if(loadingMore && currentPersonalUser && personalPosts[currentPersonalUser._id] && fetchMorePosts){
      const skip =  personalPosts[currentPersonalUser._id].length ; 
      const limit = +process.env.REACT_APP_POSTS_PER_PAGE;
      const userId = currentPersonalUser._id ; 
      fetchMorePosts({skip, limit, userId}).then( ({data : {fetchPosts}}) => {             
        setPersonalPosts(userId, [...personalPosts[currentPersonalUser._id], ...fetchPosts])
        setLoadingMore(false);
      })
    }
  }, [loadingMore, currentPersonalUser, personalPosts, fetchMorePosts])  
  return (
    <Wrapper>
      <LeftSide>
        <IntroductionBox />
      </LeftSide>
      <RightSide>
        {user &&
        currentPersonalUser &&
        currentPersonalUser.slug === user.slug ? (
          <BoxCreatePost />
        ) : null}
        {currentPersonalUser &&
        personalPosts[currentPersonalUser._id] &&
        personalPosts[currentPersonalUser._id].length ? (
          <Posts posts={personalPosts[currentPersonalUser._id]} />
        ) : null}
      </RightSide>
    </Wrapper>
  );
};

export default PersonalPosts;
