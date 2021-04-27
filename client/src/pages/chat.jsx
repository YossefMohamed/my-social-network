import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChatAction } from "../actions/userActions";
import { getChatList } from "../actions/messageActions";
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

  const [userChat, setUserChat] = React.useState(userInfo.chat[0]);
  console.log(userInfo.chat[0]);
  React.useEffect(() => {
    // dispatch(getMessages(userInfo.token));
    dispatch(userChatAction(userChat, userInfo.token));
  }, [userChat]);
  React.useEffect(() => {
    dispatch(getChatList(userInfo.chat, userInfo.token));
  }, []);
  // const userChatClick = (e, i) => setUserChat(i);

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
        </div>
        {console.log(!currentChatUser.user)}
        {console.log(currentChatUser)}
        {console.log(currentChatUser.user)}
        {console.log(currentChatUser)}
        {console.log(currentChatUser.user)}
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
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
