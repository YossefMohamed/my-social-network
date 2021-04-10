import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import "./publishCard.css";
function PuplishCard(props) {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card__title">
          <div className="card__title--image">
            <img src="./favicon.ico" alt="Card_Image" />
          </div>
          <div className="card__title--text">
            <span className="card--creator">
              Yossef Mohamed
              <span className="card--date">Published At 45/78/2015</span>
            </span>
          </div>
        </div>

        <div className="card__body">
          <div className="card__body--text">
            THis My First Post Ya Gd3aan Ana Fra77777an Aweeeee ! THis My First
            Post Ya Gd3aan Ana Fra77777an Aweeeee ! THis My First Post Ya Gd3aan
            Ana Fra77777an Aweeeee ! THis My First Post Ya Gd3aan Ana Fra77777an
            Aweeeee ! THis My First Post Ya Gd3aan Ana Fra77777an Aweeeee ! THis
            My First Post Ya Gd3aan Ana Fra77777an Aweeeee ! THis My First Post
            Ya Gd3aan Ana Fra77777an Aweeeee !
          </div>

          <div className="card__body--image">
            <img src="./wp4981553.png" alt="Post-icon" />
          </div>
        </div>

        <div className="card__footer">
          <div className="card__footer--like">
            <AiFillLike size="2rem" />
            <span className="like--counter">150 Likes</span>
          </div>
          <div className="card__footer--comment">
            <FaComments size="2rem" />
            <span className="comment--counter">150 comment</span>
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
  );
}

export default PuplishCard;
