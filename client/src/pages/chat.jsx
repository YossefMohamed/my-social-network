import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, userChatAction } from "../actions/userActions";
import { getChatList, getMessages } from "../actions/messageActions";
import LoaderComponent from "../components/loader/Loader";
import ChatItem from "./../components/chatFriendItem/chatListItem";
import "./chat.css";

import Loader from "react-loader-spinner";
import ChatBody from "../components/chatBody/chatBody";
import { socket } from "../app";

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
    dispatch(getMe(userInfo._id, userInfo.token));
    // dispatch({
    //   type: "CURRENT_USER_CHAT",
    //   payload: props.location.search.split("=")[1],
    // });
    // dispatch({
    //   type: "GET_CHAT_USER_ID",
    //   payload: props.location.search.split("=")[1],
    // });
    // console.log(props.location.search.split("=")[1], "asdsadadawdwa");
    // console.log(props.location.search.split("=")[1], "asdsadadawdwa");
    // console.log(props.location.search.split("=")[1], "asdsadadawdwa");
    userInfo.chat.map((c) => {
      chatsFromUserInfo.push(c.user);
    });
    setUserChat(chatsFromUserInfo[0]);
  }, []);
  console.log(chatsFromUserInfo);

  // React.useEffect(() => {
  //   // dispatch(getMessages(userInfo.token));
  //   dispatch(userChatAction(userChat, userInfo.token));
  // }, [userChat]);
  React.useEffect(() => {
    dispatch(getMe(userInfo._id, userInfo.token));
    dispatch(getChatList(chatsFromUserInfo, userInfo.token));
  }, []);
  let task = false;
  socket.on("newChat", (data) => {
    // alert("data.author");
    // chatsFromUserInfo.map((chat) => {
    //   if (String(chat) === String(data.author)) {
    //     task = true;
    //   }
    // });
    // chatsFromUserInfo = [...chatsFromUserInfo, data.author];
    // if (!task) chatsFromUserInfo.push(data.author);
  });
  // React.useEffect(() => {
  //   if (chatsFromUserInfo) {
  //     if (chatsFromUserInfo.length) {
  //       dispatch(getChatList(chatsFromUserInfo, userInfo.token));
  //       console.log(chatsFromUserInfo, "ASDA");
  //     }
  //   }
  // }, [chatsFromUserInfo]);
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
        <div
          className="chat__container__friendList"
          style={{ padding: "2rem 0", borderRadius: "50px" }}
        >
          <div className="friend__item">
            {/* <div className="friend__item--picture">
              <img src="favicon.ico" />
            </div>
            <div className="friend__item--info">
                .
            </div> */}

            {userChatList.loading && (
              <div className="loader">
                <Loader type="Oval" color="black" height={100} width={100} />
              </div>
            )}
            {!userChatList.chatList.length && (
              <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
                No Recent Chats
              </h1>
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
