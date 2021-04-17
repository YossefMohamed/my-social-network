import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function Comment(props) {
  return (
    <div className="card__comment">
      <div className="card__comment--image">
        <img src="./favicon.ico" alt="" />
      </div>
      <div className="comment--content">
        <span>{props.comment.author.name}</span>
        <span>{props.comment.content} </span>
        <div className="input--send">
          <AiOutlineClose size="25px" />
        </div>
      </div>
    </div>
  );
}

export default Comment;
