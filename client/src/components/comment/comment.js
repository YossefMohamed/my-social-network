import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/postAction";

function Comment(props) {
  const [online, setOnline] = React.useState(false);
  const { onlineFriends } = useSelector((state) => state);
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
    onlineFriends[props.comment.author._id] === true && setOnline(true);
  }, [onlineFriends]);
  React.useEffect(() => {
    onlineFriends[props.comment.author._id] === true && setOnline(true);
    String(userInfo._id) === String(props.comment.author._id) &&
      setOnline(true);
  }, []);

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
        {online ? (
          <div className="status">
            <i className="fa fa-circle online"></i>{" "}
          </div>
        ) : (
          <div className="status">
            <i className="fa fa-circle offline"></i>{" "}
          </div>
        )}{" "}
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
