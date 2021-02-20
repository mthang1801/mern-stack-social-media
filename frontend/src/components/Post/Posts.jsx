import React from 'react'
import PostCard from "./PostCard";
const Posts = ({posts}) => {    
  return (
    <div>
      {posts.map(post => (
        <PostCard key={`post-${post._id}`} post={post}/>
      ))}
    </div>
  )
}

export default Posts
