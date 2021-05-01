import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../actions/postAction";

function Comment(props) {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [deleted, setDeleted] = React.useState(false);
  React.useEffect(() => {
    if (deleted) {
      dispatch(deleteComment(props.comment._id, userInfo.token));
      alert("Ok");
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
        <img
          src="https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png"
          alt=""
        />
      </div>
      <div className="comment--content">
        <span>{props.comment.author.name}</span>
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
