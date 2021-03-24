import React, { useEffect, useState } from "react";
import { Wrapper, LeftSide, RightSide } from "./PersonalPosts.styles";
import Posts from "../Post/Posts";
import { useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_CURRENT_PERSONAL_USER,
  GET_PERSONAL_POSTS,
} from "../../apollo/operations/queries/cache";
import { FETCH_POSTS } from "../../apollo/operations/queries/post";
import IntroductionBox from "./IntroductionBox";
import { cacheMutations } from "../../apollo/operations/mutations";

const PersonalPosts = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const {
    data: { user },
  } = useQuery(GET_CURRENT_USER, { fetchPolicy: "cache-first" });
  const {
    data: { currentPersonalUser },
  } = useQuery(GET_CURRENT_PERSONAL_USER, { fetchPolicy: "cache-first" });
  const {
    data: { personalPosts },
  } = useQuery(GET_PERSONAL_POSTS, { fetchPolicy: "cache-first" });

  // const { refetch: fetchMorePosts } = useQuery(FETCH_POSTS, {
  //   skip: true,
  //   fetchPolicy: "cache-and-network",
  // });
  // const { setPersonalPosts } = cacheMutations;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const docEl = document.documentElement;
      if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.75) {
        setLoadingMore(true);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        const docEl = document.documentElement;
        if (docEl.clientHeight + docEl.scrollTop > docEl.scrollHeight * 0.75) {
          setLoadingMore(true);
        }
      });
    };
  }, []);

  // useEffect(() => {
  //   let _mounted = true;
  //   if (
  //     loadingMore &&
  //     currentPersonalUser &&
  //     personalPosts[currentPersonalUser.slug] &&
  //     fetchMorePosts
  //   ) {
  //     const skip = personalPosts[currentPersonalUser.slug].length;
  //     const limit = +process.env.REACT_APP_POSTS_PER_PAGE;
  //     const userId = currentPersonalUser._id;
  //     fetchMorePosts({ skip, limit, userId }).then(
  //       ({ data: { fetchPosts } }) => {
  //         if (_mounted) {
  //           setPersonalPosts({
  //             ...personalPosts,
  //             [currentPersonalUser.slug]: [
  //               ...personalPosts[currentPersonalUser.slug],
  //               ...fetchPosts,
  //             ],
  //           });
  //           setLoadingMore(false);
  //         }
  //       }
  //     );
  //   }
  //   return () => (_mounted = false);
  // }, [loadingMore, currentPersonalUser, personalPosts, fetchMorePosts]);
  return (
    <Wrapper>
      <LeftSide>
        <IntroductionBox />
      </LeftSide>
      <RightSide>        
        {currentPersonalUser &&
        personalPosts[currentPersonalUser.slug] &&
        personalPosts[currentPersonalUser.slug].length ? (
          <Posts posts={personalPosts[currentPersonalUser.slug]} />
        ) : null}
      </RightSide>
    </Wrapper>
  );
};

export default PersonalPosts;
