import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./publishCard.css";
import { addComment, likePost, unLikePost } from "../../actions/postAction";
import Comment from "../comment/comment";
function PuplishCard(props) {
  const postComments = props.comments ? props.comments : [];
  const [liked, setLiked] = React.useState(false);
  const [comments, setComments] = React.useState(postComments);
  const [likes, setLikes] = React.useState(props.post.likes);
  const [content, setContent] = React.useState("");
  const from =
    moment(props.post.createdAt).fromNow()[0] +
    moment(props.post.createdAt).fromNow()[1].trim();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { post } = useSelector((state) => state.likePost);
  const handleLikePost = (e) => {
    if (!liked) {
      dispatch(likePost(props.post._id, userInfo.token));
      setLiked(true);
    }
    if (liked) {
      dispatch(unLikePost(props.post._id, userInfo.token));
      setLiked(false);
    }
  };

  // console.log(content);
  // console.log(content);
  const handleCommentContent = (e) => {
    setContent(e.target.value);
    // console.log(e.target.value);
  };
  const handleAddComment = (e) => {
    if (content) {
      dispatch(addComment(content, props.post._id, userInfo.token));
      setComments([
        ...comments,
        {
          author: {
            _id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
          },
          content,
          post: props.post._id,
        },
      ]);
      setContent("");
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: "Please Add A Content For The Comment :)",
      });
    }
  };
  React.useEffect(() => {
    if (post) {
      if (post._id === props.post._id) {
        setLikes(post.likes);
      }
    }
  }, [post]);
  React.useEffect(() => {
    if (likes.includes(userInfo._id)) {
      setLiked(true);
    }
  }, []);
  return (
    <div className="card">
      <div className="card__container">
        <div className="exit__sign">
          <BsThreeDots size="25px" />
        </div>
        <div className="card__title">
          <div className="card__title--image">
            <img src="./favicon.ico" alt="Card_Image" />
          </div>
          <div className="card__title--text">
            <span className="card--creator">
              {props.post.author.name}
              <span className="card--date">
                Published At{" "}
                {1 * from > 10
                  ? moment().format("MMMM Do YYYY, h a")
                  : moment(props.post.createdAt).fromNow()}
              </span>
            </span>
          </div>
        </div>

        <div className="card__body">
          <div className="card__body--text">{props.post.content}</div>

          <div className="card__body--image">
            <img src="./wp4981553.png" alt="Post-icon" />
          </div>
        </div>

        <div className="card__footer">
          <div
            className={` ${
              liked ? "card__footer--like liked" : "card__footer--like"
            } `}
          >
            <AiFillLike size="2rem" onClick={handleLikePost} />
            <span className="like--counter">{likes.length} Likes</span>
          </div>
          <div className="card__footer--comment">
            <FaComments size="2rem" />
            <span className="comment--counter">150 comment</span>
          </div>
        </div>
        <div className="card__container--border">
          {comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}

          <div className="card__comment">
            <div className="card__comment--image">
              <img src="./favicon.ico" alt="" />
            </div>
            <div className="card__comment--input">
              <input
                type="text"
                placeholder="Add Your Comment !!"
                onChange={handleCommentContent}
                value={content}
              />
              <div className="input--send" onClick={handleAddComment}>
                <BiSend size="3rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PuplishCard;
