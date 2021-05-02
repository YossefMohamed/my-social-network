import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./../../app";

import "./publishCard.css";
import {
  addComment,
  deletePost,
  likePost,
  unLikePost,
} from "../../actions/postAction";
import Comment from "../comment/comment";
import { Link } from "react-router-dom";
function PuplishCard(props) {
  React.useEffect(() => {
    socket.emit("joinPostRoom", props.post.id);
  }, []);

  const postComments = props.post.comments ? props.post.comments : [];
  const [comments, setComments] = React.useState(postComments);
  const [likes, setLikes] = React.useState(props.post.likes);
  const [content, setContent] = React.useState("");
  const [options, setOptions] = React.useState(false);
  const from =
    moment(props.post.createdAt).fromNow()[0] +
    moment(props.post.createdAt).fromNow()[1].trim();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const [liked, setLiked] = React.useState(false);
  // console.log(liked ? "card__footer--like liked" : "card__footer--like");
  // console.log(liked ? "card__footer--like liked" : "card__footer--like");
  // console.log(liked ? "card__footer--like liked" : "card__footer--like");
  // console.log(liked ? "card__footer--like liked" : "card__footer--like");
  const { post } = useSelector((state) => state.likePost);
  const { addedComment } = useSelector((state) => state);
  const handleLikePost = (e) => {
    if (!liked) {
      dispatch(likePost(props.post._id, userInfo.token));

      socket.emit("likePost", {
        post: props.post._id,
        user: userInfo._id,
        author: props.post.author,
        name: userInfo.name,
      });
      setLiked(true);
    }
    if (liked) {
      dispatch(unLikePost(props.post._id, userInfo.token));

      socket.emit("unLikePost", { post: props.post._id, user: userInfo._id });
      setLiked(false);
    }
  };
  socket.on("receiverLikePost", (user) => {
    setLikes([...likes, user]);
  });
  socket.on("receiverUnlikePost", (user) => {
    setLikes(likes.filter((like) => like !== user));
  });
  socket.on("receiveAddComment", (comment) => {
    setComments([...comments, comment]);
  });
  const handleCommentContent = (e) => {
    setContent(e.target.value);
    // console.log(e.target.value);
  };
  const handleAddComment = (e) => {
    socket.emit("addComment", {
      author: {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
      },
      content,
      post: props.post._id,
      postAuthor: props.post.author,
    });
    if (content) {
      dispatch(addComment(content, props.post._id, userInfo.token));
      socket.emit("comment", {
        author: {
          _id: userInfo._id,
          name: userInfo.name,
          email: userInfo.email,
        },
        content,
        post: props.post._id,
      });
      setContent("");
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          type: "error",
          message: "Please Add A Content For The Comment :)",
        },
      });
    }
  };
  React.useEffect(() => {
    setComments([...comments, addedComment]);
  }, [addedComment]);
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  // console.log(likes.includes(userInfo._id), "asdadadwdawdaw");
  React.useEffect(() => {
    if (post) {
      if (post._id === props.post._id) {
        setLikes(post.likes);
      }
    }
  }, [post]);
  const handleDeleteCommentFromCard = (id) => {
    const filteredComments = comments.filter((comment) => comment._id !== id);
    setComments(filteredComments);
  };
  // console.log(props);
  // console.log(props);
  // console.log(props);
  // console.log(props);
  // console.log(props);
  React.useEffect(() => {
    if (likes.includes(userInfo._id)) {
      setLiked(true);
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
      // console.log(liked, "asdadadwdawdaw");
    }
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    // console.log(liked, "asdadadwdawdaw");
    console.log(props.post.author);
  }, []);
  React.useEffect(() => {
    setLikes(props.post.likes);
    setComments(postComments);
    !props.post.likes.includes(userInfo._id) && setLiked(false);
  }, [props.post.likes]);
  return (
    <div className="card">
      <div className="card__container">
        <div className="exit__sign">
          <div
            className="option--disiplay"
            onClick={(e) => {
              console.log(options);
              setOptions(!options);
            }}
          ></div>
          {props.post.author._id === userInfo._id && (
            <BsThreeDots size="25px" />
          )}
          {
            <div
              className="options"
              style={{ display: `${options ? "flex" : "none"}` }}
            >
              <span onClick={(e) => dispatch()}>Edit</span>
              <span
                onClick={(e) => {
                  setOptions(!options);
                  dispatch(deletePost(props.post._id, userInfo.token));
                }}
              >
                Delete
              </span>
            </div>
          }
        </div>
        <div className="card__title">
          <div className="card__title--image">
            <Link to={`/profile/${userInfo._id}`} className="profile-link">
              <img src={`/static/images/${userInfo.image}`} alt="Card_Image" />
            </Link>
          </div>
          <div className="card__title--text">
            <span className="card--creator">
              <Link to={`/profile/${userInfo._id}`} className="profile-link">
                {props.post.author.name}
              </Link>
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

          {props.post.image && (
            <div className="card__body--image">
              <img src={`/static/images/${props.post.image}`} alt="Post-icon" />
            </div>
          )}
        </div>

        <div className="card__footer">
          <div
            className={` ${
              liked ? "card__footer--like liked" : "card__footer--like"
            } `}
            onClick={handleLikePost}
          >
            <AiFillLike size="2rem" style={{ cursor: "pointer" }} />
            <span className="like--counter">{likes.length} Likes</span>
          </div>
          <div className="card__footer--comment">
            <FaComments size="2rem" style={{ cursor: "pointer" }} />
            <span className="comment--counter">{comments.length} comment</span>
          </div>
        </div>
        <div className="card__container--border">
          {comments.map((comment, idx) => (
            <Comment
              key={idx}
              comment={comment}
              delete={handleDeleteCommentFromCard}
            />
          ))}

          <div className="card__comment">
            <div className="card__comment--image">
              <img src={`/static/images/${userInfo.image}`} alt="" />
            </div>
            <div className="card__comment--input">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment();
                }}
              >
                <input
                  type="text"
                  placeholder="Add Your Comment !!"
                  onChange={handleCommentContent}
                  value={content}
                />
              </form>
              <div
                className="input--send"
                onClick={handleAddComment}
                style={{ cursor: "pointer" }}
              >
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
