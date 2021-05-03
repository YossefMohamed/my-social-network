import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../actions/messageActions";

function ChatItem({ user }) {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [online, setOnline] = React.useState(false);
  const { onlineFriends } = useSelector((state) => state);
  const [chatUserId, setChatUserId] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    onlineFriends[user._id] === true && setOnline(true);
  }, [onlineFriends]);
  React.useEffect(() => {
    onlineFriends[user._id] === true && setOnline(true);
  }, []);
  return (
    <div
      className="chat--item--container"
      style={{ cursor: "pointer" }}
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
          src={`/static/images/${user.image}`}
          alt="avatar"
          style={{ width: "85px" }}
        />
        <div className="about">
          <div className="name">{user.name}</div>
          <div className="status">
            {online ? (
              <>
                <i className="fa fa-circle online"></i> online{" "}
              </>
            ) : (
              <>
                <i className="fa fa-circle offline"></i> offline{" "}
              </>
            )}
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
