import React from "react";
import { useSelector } from "react-redux";

function ChatBody(props) {
  console.log(props);
  console.log(props);
  console.log(props);
  console.log(props);
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <div className="chat__body">
      <div className="chat__body--title">
        <div className="title--image">
          <img src="./favicon.ico" alt="profilePicture" />
        </div>
        <div className="title--text">
          {" "}
          <div className="about">
            <div className="name">{props.currentChatUser.user.name}</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </div>
      </div>

      <div className="chat__body__content chat">
        {props.chatMessages.map((i) => {
          //   console.log(i.author === userInfo._id);
          //   console.log(i.author, userInfo._id);
          //   console.log(i.author, userInfo._id);
          //   console.log(i.author, userInfo._id);
          //   console.log(i.author, userInfo._id);
          //   console.log(i.author);
          //   console.log(i.author);
          if (i.author === userInfo._id) {
            return (
              <div class="bubble you">
                <span className="message--date">Today, 5:38 PM</span>
                {i.content}
              </div>
            );
          }
          return (
            <div class="bubble me">
              <span className="message--date">Today, 5:38 PM</span>
              {i.content}
            </div>
          );
        })}
      </div>

      <div class="write">
        <input type="text" placeholder="Write Your Message !!" />
        <div className="send__links">
          <a href="javascript:;" class="write-link smiley"></a>
          <a href="javascript:;" class="write-link send"></a>
        </div>
      </div>
    </div>
  );
}

export default ChatBody;
