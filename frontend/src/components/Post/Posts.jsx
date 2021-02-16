import React from 'react'
import {useQuery} from "@apollo/client"
import {GET_POSTS} from "../../apollo/operations/queries/getPosts"

import PostCard from "./PostCard";
const Posts = () => {  
  const  {data : postsData} = useQuery(GET_POSTS, {fetchPolicy : "cache-and-network"});
  
  if(!postsData || !postsData.posts.length) return null;
  return (
    <div>
      {postsData.posts.map(post => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  )
}

export default Posts
