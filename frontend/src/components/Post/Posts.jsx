import React, {useEffect} from 'react'
import {useLazyQuery} from "@apollo/client"
import {GET_POSTS} from "../../apollo/operations/queries/getPosts"
import PostCard from "./PostCard";
const Posts = () => {  
  const [getPosts, {data : postsData}] = useLazyQuery(GET_POSTS);
  useEffect(()=>{
    let _isMounted = true ; 
    if(_isMounted){
      getPosts();
    }
    return () => _isMounted = false ; 
  },[getPosts])
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
