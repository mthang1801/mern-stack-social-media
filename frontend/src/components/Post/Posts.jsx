import React from 'react';
import PostCard from './PostCard';
import LazyLoad from 'react-lazyload';
const Posts = ({ posts }) => {
  return (
    <section>
      {posts.map((post) => (
        <div key={`post-${post._id}`} placeholder="<div>Loading...</div>">
          <PostCard post={post} />
        </div>
      ))}
    </section>
  );
};

export default React.memo(Posts);
