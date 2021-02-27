import React from "react";
import { Wrapper, Avatar, BubbleContainer, Message } from "./styles/Bubble.styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Bubble = ({ data }) => {
  return (
    <Wrapper>
      <BubbleContainer me={data.user === "me"}>
        <Avatar>
          <LazyLoadImage src={data.avatar} />
        </Avatar>
        <Message me={data.user === "me"}>
          {data.message}
        </Message>
      </BubbleContainer>
    </Wrapper>
  );
};

export default Bubble;
