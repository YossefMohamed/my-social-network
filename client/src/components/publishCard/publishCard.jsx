import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import "./publishCard.css";
import { likePost, unLikePost } from "../../actions/postAction";
function PuplishCard(props) {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(props.post.likes);
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
            {console.log(liked)}
            <AiFillLike size="2rem" onClick={handleLikePost} />
            <span className="like--counter">{likes.length} Likes</span>
          </div>
          <div className="card__footer--comment">
            <FaComments size="2rem" />
            <span className="comment--counter">150 comment</span>
          </div>
        </div>
        <div className="card__container--border">
          <div className="card__comment">
            <div className="card__comment--image">
              <img src="./favicon.ico" alt="" />
            </div>
            <div className="comment--content">
              This Is A Test Comment :)
              <div className="input--send">
                <BiSend size="3rem" />
              </div>
            </div>
          </div>
          <div className="card__comment">
            <div className="card__comment--image">
              <img src="./favicon.ico" alt="" />
            </div>
            <div className="card__comment--input">
              <input type="text" placeholder="Add Your Comment !!" />
              <div className="input--send">
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
