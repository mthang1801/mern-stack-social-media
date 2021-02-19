import React from 'react'
import {Wrapper, LeftSide, RightSide} from "./personal-posts.styles"
import BoxCreatePost from "../components/Post/BoxCreatePost/BoxCreatePost"
import Posts from "../components/Post/Posts"
import {useQuery} from "@apollo/client";
import {GET_CURRENT_USER, GET_CURRENT_PERSONAL_USER} from "../apollo/operations/queries"
import IntroductionBox from '../components/Personal/IntroductionBox';
const PersonalPosts = (props) => {
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-first"})
  const {data : {currentPersonalUser}} = useQuery(GET_CURRENT_PERSONAL_USER, {fetchPolicy : "cache-first"})
  

  return (
    <Wrapper>
      <LeftSide>
        <IntroductionBox/>
      </LeftSide>
      <RightSide>
        {currentPersonalUser.slug === user.slug ? <BoxCreatePost/> : null}
      </RightSide>
    </Wrapper>
  )
}

export default PersonalPosts
