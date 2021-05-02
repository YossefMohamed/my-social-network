import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/postAction";

function Comment(props) {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [deleted, setDeleted] = React.useState(false);
  console.log(props);
  console.log(props);
  console.log(props);
  React.useEffect(() => {
    if (deleted) {
      dispatch(deleteComment(props.comment._id, userInfo.token));
      setDeleted(false);
    }
  }, [deleted]);
  React.useEffect(() => {
    return setDeleted(false);
  }, []);
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    setDeleted(true);
    props.delete(props.comment._id);
  };
  return (
    <div className="card__comment">
      <div className="card__comment--image">
        <Link to={`/profile/${props.comment.author._id}`}>
          {" "}
          <img src={`/static/images/${props.comment.author.image}`} alt="" />
        </Link>
      </div>
      <div className="comment--content">
        <Link to={`/profile/${props.comment.author._id}`}>
          <span>{props.comment.author.name}</span>
        </Link>

        <span>{props.comment.content} </span>
        <div
          className="input--send"
          style={{
            display: `${
              props.comment.author._id === userInfo._id ? "block" : "none"
            }`,
          }}
          onClick={handleDeleteComment}
        >
          <AiOutlineClose size="25px" />
        </div>
      </div>
    </div>
  );
}

export default Comment;
