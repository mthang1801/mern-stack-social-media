import React from "react";
import PostCard from "./PostCard";
import LazyLoad from "react-lazyload";
const Posts = ({ posts }) => {  
  return (
    <section>
      {posts.map((post) => (
        <LazyLoad placeholder="<div>Loading...</div>">
          <PostCard key={`post-${post._id}`} post={post} />
        </LazyLoad>
      ))}
    </section>
  );
};

export default React.memo(Posts);
