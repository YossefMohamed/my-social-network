import moment from "moment";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getChatList, sendMessage } from "../../actions/messageActions";
import { getMe } from "../../actions/userActions";
import { socket } from "./../../app";

import "./chatBody.css";
function ChatBody(props) {
  const [message, setMessage] = React.useState("");
  const [messageFromSocket, setMessageFromSocket] = React.useState("");
  const [messageList, setMessageList] = React.useState(props.chatMessages);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userId } = useSelector((state) => state.chatUserId);
  const myRef = React.useRef("");
  // React.useEffect(() => {
  //   dispatch(getMe(userInfo._id, userInfo.token));
  // }, []);
  React.useEffect(() => {
    socket.emit("joinChat", props.currentUserChatId);
  }, []);

  React.useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo(0, myRef.current.scrollHeight);
    }
  }, [, myRef]);
  // alert(props.currentUserChatId);
  const onSubmitMessageHandler = (e) => {
    e.preventDefault();
    dispatch(
      sendMessage(message, props.currentChatUser.user._id, userInfo.token)
    );
    socket.emit("sendMessage", {
      author: userInfo._id,
      name: userInfo.name,
      receiver: props.currentChatUser.user._id,
      content: message,
      createdAt: Date.now(),
      chatIdd: props.currentUserChatId,
    });
    setMessage("");
  };
  let chatsFromUserInfo = [];
  socket.on("newMessage", (data) => {
    setMessageFromSocket(data);
    if (!userInfo.chat.includes(data.author)) {
      console.log(data);
      dispatch(getMe(userInfo._id, userInfo.token));
      userInfo.chat.map((c) => {
        if (!chatsFromUserInfo.includes(c)) {
          chatsFromUserInfo.push(c.user);
        }
      });
      dispatch(getChatList(chatsFromUserInfo, userInfo.token));
    }
    myRef.current && myRef.current.scrollTo(0, myRef.current.scrollHeight);
    // console.log(data);
  });
  React.useEffect(() => {
    messageFromSocket &&
      setMessageList((messages) => [...messages, messageFromSocket]);
  }, [messageFromSocket]);
  return (
    <div className="chat__body">
      <div className="chat__body--title">
        <div className="title--image">
          <img
            src={`/static/images/${props.currentChatUser.user.image}`}
            alt="profilePicture"
          />
        </div>
        <div className="title--text">
          {" "}
          <div className="about">
            <Link to={props.currentChatUser.user._id}>
              {" "}
              <div className="name">{props.currentChatUser.user.name}</div>
            </Link>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </div>
      </div>

      <div className="chat__body__content chat" ref={myRef}>
        {messageList.map((i) => {
          if (i.author === userInfo._id) {
            return (
              <div class="bubble me" key={i._id}>
                <span className="message--date">
                  {" "}
                  {moment(i.createdAt).fromNow()}
                </span>
                {i.content}
              </div>
            );
          }
          return (
            <div class="bubble you" key={i._id}>
              <span className="message--date">
                {" "}
                {moment(i.createdAt).fromNow()}
              </span>
              {i.content}
            </div>
          );
        })}
      </div>

      <div class="write">
        <form onSubmit={onSubmitMessageHandler}>
          <input
            type="text"
            placeholder="Write Your Message !!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="send__links">
            <a href="javascript:;" class="write-link smiley"></a>
            <button href="javascript:;" class="write-link send"></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBody;
