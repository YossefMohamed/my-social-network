import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, userChatAction } from "../actions/userActions";
import { getChatList, getMessages } from "../actions/messageActions";
import LoaderComponent from "../components/loader/Loader";
import ChatItem from "./../components/chatFriendItem/chatListItem";
import "./chat.css";

import Loader from "react-loader-spinner";
import ChatBody from "../components/chatBody/chatBody";

function Chat(props) {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo } = useSelector((state) => state.userLogin);
  const userChatState = useSelector((state) => state.userChat);
  const { userChatList } = useSelector((state) => state);
  const { chatMessages } = useSelector((state) => state);
  // const { chatMessages } = useSelector((state) => state);
  const { currentChatUser } = useSelector((state) => state);
  const { userId } = useSelector((state) => state.chatUserId);
  let chatsFromUserInfo = [];

  const [userChat, setUserChat] = React.useState(chatsFromUserInfo[0]);

  React.useEffect(() => {
    userInfo.chat.map((c) => {
      chatsFromUserInfo.push(c.user);
    });
    setUserChat(chatsFromUserInfo[0]);
  }, []);
  console.log(chatsFromUserInfo);

  React.useEffect(() => {
    // dispatch(getMessages(userInfo.token));
    dispatch(userChatAction(userChat, userInfo.token));
  }, [userChat]);
  React.useEffect(() => {
    dispatch(getMe(userInfo._id, userInfo.token));
    dispatch(getChatList(chatsFromUserInfo, userInfo.token));
  }, []);
  React.useEffect(() => {
    dispatch(getMessages(userId, userInfo.token));
  }, [userId]);
  // const userChatClick = (e, i) => setUserChat(i);
  let currentUserChatId;
  userInfo.chat.map((c) => {
    if (c.user === userId) currentUserChatId = c.chatId;
  });
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
            {userChatList.loading && (
              <div className="loader">
                <Loader type="Oval" color="black" height={100} width={100} />
              </div>
            )}
            {userChatList.chatList.map((i) => {
              return (
                <div>
                  <ChatItem user={i} />
                </div>
              );
            })}
          </div>
          {console.log(userChat)}
          {console.log(userChat)}
          {console.log(userChat)}
          {console.log(userChat)}
          {console.log(userChat)}
          {console.log(userChat)}
          {console.log(userChat)}
        </div>

        {!userChat || !Object.keys(currentChatUser.user).length ? (
          <div className="chat__body no--chat">
            <h1>Select user to chat with</h1>
          </div>
        ) : chatMessages.loading ? (
          <div className="chat__body no--chat">
            <h1>
              <LoaderComponent />
            </h1>
          </div>
        ) : (
          <ChatBody
            currentChatUser={currentChatUser}
            chatMessages={chatMessages.messages}
            currentUserChatId={currentUserChatId}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
