import React from "react";
import ResponseItem from "./ResponseItem";
import CommentCard from "./CommentCard"
const Responses = ({ responses, user }) =>
  responses.map((response) => (
    <CommentCard
      key={`response-${response._id}`}
      comment={response}
      user={user}
    />
  ));

export default Responses;
