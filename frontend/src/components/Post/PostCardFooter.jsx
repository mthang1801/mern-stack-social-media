import React from "react";
import {
  Wrapper,
  Controls,
  Button,
  Counter,
  LikeButton,
  Comments,
  UserComment,
  AvatarContainer,
  FormComment
} from "./styles/PostCardFooter.styles";
import useLanguage from "../Global/useLanguage";
import { BiLike } from "react-icons/bi";
import { useThemeUI } from "theme-ui";
import {useQuery} from "@apollo/client"
import {GET_CURRENT_USER} from "../../apollo/operations/queries/cache"
import LazyLoad from "react-lazyload";
import CommentEditor from "./CommentEditor"
const PostCardFooter = ({ post }) => {
  const { i18n, lang } = useLanguage();
  const { controls, commentPlaceholder } = i18n.store.data[lang].translation.post;
  const { colorMode } = useThemeUI();
  const {data : {user}} = useQuery(GET_CURRENT_USER, {fetchPolicy : "cache-only"})
  return (
    <Wrapper>
      <Controls theme={colorMode}>
        {controls.map(({ name, icon }) => (
          <Button key={name} theme={colorMode}>
            <span>{icon()}</span>
            <span>{name}</span>
          </Button>
        ))}
      </Controls>
      {!post.likes.length ? (
        <Counter>
          <LikeButton>
            <BiLike />
          </LikeButton>
          <span>50</span>
        </Counter>
      ) : null}
      <Comments>
        <UserComment>          
          <AvatarContainer>            
            <LazyLoad>
              <img src={user.avatar} alt={user.avatar}/>
            </LazyLoad>
          </AvatarContainer>
          <FormComment theme={colorMode}>
            <CommentEditor/>
          </FormComment>
        </UserComment>
      </Comments>
    </Wrapper>
  );
};

export default PostCardFooter;
