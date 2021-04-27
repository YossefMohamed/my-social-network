import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendList from "../components/friendList/friendList";
import PublishCard from "./../components/publishCard/publishCard";
import {
  acceptUser,
  addUser,
  cancel,
  deleteUser,
  getMe,
  userData,
} from "./../actions/userActions";
import "./profile.css";
import LoaderComponent from "../components/loader/Loader";
import PuplishCard from "./../components/publishCard/publishCard";
import { sendMessage } from "../actions/messageActions";
function Profile(props) {
  const [friends, setFriends] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  React.useEffect(() => {
    dispatch(getMe(userInfo._id, userInfo.token));
  }, [, props.location]);

  React.useEffect(() => {
    const myLocation = props.location.search.slice(1);
    if (myLocation === "friends") {
      setFriends(true);
    }
  }, [props.location]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userData(props.match.params.id, userInfo.token));
  }, [, props.location]);

  const userDataInfo = useSelector((state) => state.userData);
  const handleFriendList = () => {
    setFriends(true);
  };
  const handleUserPosts = () => {
    setFriends(false);
  };
  console.log(userInfo);
  console.log(userInfo);
  console.log(userInfo);
  console.log(userInfo);
  return (
    <div className="profil__wrapper">
      <div
        className="message--form"
        style={{ display: `${message ? "flex" : "none"}` }}
      >
        <div className="close--message">
          <button onCLick={(e) => setMessage(!message)}>X</button>
        </div>
        <h1>Enter Your Message </h1>
        <input
          type="text"
          className="message--form--input"
          onChange={(e) => {
            dispatch(sendMessage(userDataInfo.userData._id, userInfo.token));
            setMessage(false);
          }}
        />
        <button className="btn profile-edit-btn">Send</button>
      </div>
      {userDataInfo.loading ? (
        <LoaderComponent />
      ) : (
        <>
          {" "}
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image">
                  <img
                    src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                    alt=""
                  />
                </div>

                <div className="profile-user-settings">
                  <h1 className="profile-user-name">
                    {userDataInfo.userData.name}
                  </h1>

                  {userDataInfo.userData._id === userInfo._id ? (
                    <button className="btn profile-edit-btn">
                      Edit Profile
                    </button>
                  ) : userInfo.sentRequests.includes(
                      userDataInfo.userData._id
                    ) ? (
                    <button
                      className="btn profile-edit-btn"
                      onClick={(e) =>
                        dispatch(
                          cancel(userDataInfo.userData._id, userInfo.token)
                        )
                      }
                    >
                      Canacle Request
                    </button>
                  ) : userInfo.friends.includes(userDataInfo.userData._id) ? (
                    <>
                      <button
                        className="btn profile-edit-btn"
                        onClick={(e) =>
                          dispatch(
                            deleteUser(
                              userDataInfo.userData._id,
                              userInfo.token
                            )
                          )
                        }
                      >
                        Delete Friend
                      </button>
                      <button
                        className="btn profile-edit-btn"
                        onClick={(e) => setMessage(!message)}
                      >
                        Message
                      </button>
                    </>
                  ) : userInfo.friendRequests.includes(
                      userDataInfo.userData._id
                    ) ? (
                    <button
                      className="btn profile-edit-btn"
                      onClick={(e) =>
                        dispatch(
                          acceptUser(userDataInfo.userData._id, userInfo.token)
                        )
                      }
                    >
                      Accept Friend
                    </button>
                  ) : (
                    <button
                      className="btn profile-edit-btn"
                      onClick={(e) => {
                        dispatch(
                          addUser(userDataInfo.userData._id, userInfo.token)
                        );
                      }}
                    >
                      Add Friend
                    </button>
                  )}
                </div>

                <div className="profile-stats">
                  <ul>
                    <li onClick={handleUserPosts}>
                      <span className="profile-stat-count">
                        {" "}
                        {userDataInfo.userData.posts &&
                          userDataInfo.userData.posts.length}
                      </span>{" "}
                      Posts
                    </li>

                    <li onClick={handleFriendList}>
                      <span className="profile-stat-count">206</span> Following
                    </li>
                  </ul>
                </div>

                <div className="profile-bio">
                  <p>
                    {!userDataInfo.userData.bio
                      ? "You Have No Bio"
                      : userDataInfo.userData.bio}

                    <i className="fas fa-edit pen--edit"></i>
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="container">
              {!friends ? (
                <>
                  <div className="header">
                    <div className="card-title">Posts</div>
                    <div className="card-amount">26</div>
                  </div>
                  {userDataInfo.userData.posts &&
                    userDataInfo.userData.posts.map((i, idx) => (
                      <>
                        <PuplishCard post={i} />
                      </>
                    ))}
                </>
              ) : (
                <FriendList friends={userDataInfo.userData.friends} />
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default Profile;
