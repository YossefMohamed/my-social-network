import React from "react";
import ChatItem from "./../components/chatFriendItem/chatListItem";
import "./chat.css";
function chat(props) {
  return (
    <div className="chat__container">
      <div className="chat__container--flex">
        <div className="chat__container__friendList">
          <div className="friend__item">
            {/* <div className="friend__item--picture">
              <img src="favicon.ico" />
            </div>
            <div className="friend__item--info">
                .
            </div> */}
            <div className="search--input">
              <input type="text" placeholder="Search For A Friend !" />
            </div>
            <ChatItem />
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </div>
        </div>
        <div className="chat__body">
          <div className="chat__body--title">
            <div className="title--image">
              <img src="./favicon.ico" alt="profilePicture" />
            </div>
            <div className="title--text">
              {" "}
              <div className="about">
                <div className="name">Vincent Porter</div>
                <div className="status">
                  <i className="fa fa-circle online"></i> online
                </div>
              </div>
            </div>
          </div>

          <div className="chat__body__content chat">
            <div class="bubble you">
              <span className="message--date">Today, 5:38 PM</span>... about who
              we used to be.
            </div>
            <div class="bubble me">
              <span className="message--date">Today, 5:38 PM</span>
              Are you serious?
            </div>
          </div>

          <div class="write">
            <input type="text" placeholder="Write Your Message !!" />
            <div className="send__links">
              <a href="javascript:;" class="write-link smiley"></a>
              <a href="javascript:;" class="write-link send"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chat;
