import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../actions/messageActions";

function ChatItem({ user }) {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [chatUserId, setChatUserId] = React.useState("");
  const dispatch = useDispatch();

  return (
    <div
      className="chat--item--container"
      onClick={(e) => {
        dispatch({
          type: "CURRENT_USER_CHAT",
          payload: user,
        });
        dispatch({
          type: "GET_CHAT_USER_ID",
          payload: user._id,
        });
      }}
    >
      <li className="item--flex">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
          alt="avatar"
        />
        <div className="about">
          <div className="name">{user.name}</div>
          <div className="status">
            <i className="fa fa-circle online"></i> online
          </div>
        </div>
      </li>
    </div>
  );
}

export default ChatItem;

// React.useEffect(() => {
//   if (chatUserId) {
//     dispatch(getMessages(chatUserId, userInfo.token));
//     dispatch({
//       type: "CURRENT_USER_CHAT",
//       payload: user,
//     });
//   }
// }, [chatUserId]);
