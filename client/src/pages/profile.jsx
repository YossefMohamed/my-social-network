import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendList from "../components/friendList/friendList";
import PublishCard from "./../components/publishCard/publishCard";
import { socket } from "./../app";

import {
  acceptUser,
  addUser,
  cancel,
  deleteUser,
  getFriendsList,
  getMe,
  userData,
  updateMe,
  addImage,
} from "./../actions/userActions";
import "./profile.css";
import PuplishCard from "./../components/publishCard/publishCard";
import { sendMessage } from "../actions/messageActions";
import Loader from "react-loader-spinner";
function Profile(props) {
  const dispatch = useDispatch();
  const userDataInfoFromState = useSelector((state) => state.userData);
  const [userDataInfo, setUserDataInfo] = React.useState(userDataInfoFromState);
  React.useEffect(() => {
    dispatch(userData(props.match.params.id, userInfo.token));
  }, [, props.match.params.id]);
  React.useEffect(() => {
    setName(userDataInfoFromState.userData.name);
    setEmail(userDataInfoFromState.userData.email);
    setBio(userDataInfoFromState.userData.bio);
  }, [userDataInfoFromState]);
  socket.on("getUser", () => {
    dispatch(userData(props.match.params.id, userInfo.token));
  });
  const myRef = React.useRef();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [friends, setFriends] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [userImage, setUserImage] = React.useState({
    url: `/static/images/${userInfo.image}`,
  });
  const [update, setUpdate] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [editMe, setEditMe] = React.useState(false);
  const [name, setName] = React.useState(userDataInfo.userData.name);
  const [email, setEmail] = React.useState(userDataInfo.userData.email);
  const [bio, setBio] = React.useState(userDataInfo.userData.Bio);
  const [password, setPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const { FriendsList } = useSelector((state) => state);

  React.useEffect(() => {
    // alert("Hey");
    dispatch(getMe(userInfo._id, userInfo.token));
    setFriends(false);
  }, [, props.match.params.id]);
  React.useEffect(() => {
    friends &&
      dispatch(getFriendsList(userDataInfo.userData._id, userInfo.token));
  }, [friends, props.match.params.id]);

  React.useEffect(() => {
    const myLocation = props.location.search.slice(1);
    if (myLocation === "friends") {
      setFriends(true);
    }
  }, [props.location]);
  React.useEffect(() => {
    if (update) {
      dispatch(
        updateMe(
          dispatch(
            updateMe(name, password, oldPassword, email, bio, userInfo.token)
          )
        )
      );
      dispatch(userData(props.match.params.id, userInfo.token));
      setEditMe(false);
    }
    setUpdate(false);
  }, [update]);
  React.useEffect(() => {
    if (image) {
      dispatch(userData(props.match.params.id, userInfo.token));

      setImage(false);
    }
    setImage(false);
  }, [image]);

  React.useEffect(() => {
    setUserDataInfo(userDataInfoFromState);
  }, [userDataInfoFromState]);

  const handleFriendList = () => {
    setFriends(true);
  };
  const handleUserPosts = () => {
    setFriends(false);
  };
  //img
  return (
    <div className="profil__wrapper">
      <div
        className="edit--form "
        style={{ display: `${editMe ? "flex" : "none"}` }}
      >
        <div className="close--message">
          <button onClick={(e) => setEditMe(!editMe)}>X</button>
        </div>
        <div className="flex--child">
          <h1>
            Name : <span>*</span>
          </h1>
          <input
            type="text"
            value={name}
            className="message--form--input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex--child">
          <h1>
            Email : <span>*</span>
          </h1>
          <input
            type="text"
            value={email}
            className="message--form--input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex--child">
          <h1>
            Bio : <span>*</span>
          </h1>
          <input
            type="text"
            value={bio}
            className="message--form--input"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </div>
        <div className="flex--child">
          <h1>Old Password :</h1>
          <input
            type="password"
            value={oldPassword}
            className="message--form--input"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex--child">
          <h1>Password :</h1>
          <input
            type="password"
            value={password}
            className="message--form--input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br />
        <button
          className="btn profile-edit-btn"
          onClick={(e) => {
            if (!name || !email || !bio) {
              dispatch({
                type: "ADD_MESSAGE",
                payload: {
                  type: "error",
                  message: "Please Fill All The Required Fields !",
                },
              });
            } else {
              if (!oldPassword && password) {
                dispatch({
                  type: "ADD_MESSAGE",
                  payload: {
                    type: "error",
                    message: "Please Enter Your Old Password",
                  },
                });
              } else {
                setUpdate(true);
              }
            }
          }}
        >
          Update
        </button>
      </div>
      <div
        className="message--form"
        style={{ display: `${message ? "flex" : "none"}` }}
      >
        <div className="close--message">
          <button onClick={(e) => setMessage(!message)}>X</button>
        </div>
        <h1>Enter Your Message </h1>
        <input
          type="text"
          className="message--form--input"
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          value={messageContent}
        />
        <button
          className="btn profile-edit-btn"
          onClick={(e) => {
            dispatch(
              sendMessage(
                messageContent,
                userDataInfo.userData._id,
                userInfo.token
              )
            );
            dispatch({
              type: "ADD_MESSAGE",
              payload: { type: "success", message: "Message Sent !" },
            });

            setMessage(false);
          }}
        >
          Send
        </button>
      </div>
      {userDataInfo.loading ? (
        <div className="loader">
          <Loader type="Oval" color="black" height={100} width={100} />
        </div>
      ) : (
        <>
          <header>
            <div className="container">
              <div className="profile">
                <div className="profile-image test-color">
                  <span
                    className="span--upload"
                    onClick={(e) => {
                      myRef.current.click();
                    }}
                  >
                    Upload
                  </span>
                  <input
                    type="file"
                    ref={myRef}
                    style={{ display: "none" }}
                    onChange={(event) => {
                      const formData = new FormData();
                      formData.append("photo", event.target.files[0]);
                      dispatch(addImage(formData, "user", userInfo._id));
                      setImage(true);
                      props.history.push(`/profile/${userInfo._id}`);
                      window.location.reload();
                    }}
                  />
                  <img
                    src={userImage.url}
                    alt=""
                    style={{ width: "30rem", height: "30rem" }}
                  />
                </div>

                <div className="profile-user-settings">
                  <h1 className="profile-user-name">
                    {userDataInfo.userData.name}
                  </h1>

                  {userDataInfo.userData._id === userInfo._id ? (
                    <button
                      className="btn profile-edit-btn"
                      onClick={() => setEditMe(true)}
                    >
                      Edit Profile
                    </button>
                  ) : userInfo.sentRequests.includes(
                      userDataInfo.userData._id
                    ) ? (
                    <button
                      className="btn profile-edit-btn"
                      onClick={(e) => {
                        dispatch(
                          cancel(userDataInfo.userData._id, userInfo.token)
                        );
                        window.location.reload();
                      }}
                    >
                      Canacle Request
                    </button>
                  ) : userInfo.friends.includes(userDataInfo.userData._id) ? (
                    <>
                      <button
                        className="btn profile-edit-btn"
                        onClick={(e) => {
                          dispatch(
                            deleteUser(
                              userDataInfo.userData._id,
                              userInfo.token
                            )
                          );
                          window.location.reload();
                        }}
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
                      onClick={(e) => {
                        dispatch(
                          acceptUser(userDataInfo.userData._id, userInfo.token)
                        );
                        socket.emit("acceptFriend", {
                          from: { name: userInfo.name, id: userInfo._id },
                          to: {
                            name: userDataInfo.userData.name,
                            id: userDataInfo.userData._id,
                          },
                        });
                        window.location.reload();
                      }}
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
                        socket.emit("sendRequest", {
                          from: { name: userInfo.name, id: userInfo._id },
                          to: {
                            name: userDataInfo.userData.name,
                            id: userDataInfo.userData._id,
                          },
                        });
                        window.location.reload();
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

                    <i
                      className="fas fa-edit pen--edit"
                      onClick={() => setEditMe(true)}
                      style={{
                        display: `${
                          userInfo._id !== userDataInfo.userData._id && "none"
                        }`,
                      }}
                    ></i>
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
              ) : FriendsList.loading ? (
                <div className="loader">
                  <Loader type="Oval" color="black" height={100} width={100} />
                </div>
              ) : (
                <div>
                  <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    rel="stylesheet"
                  />
                  <div className="list--container container">
                    <div className="create-post"></div>
                    <div className="friend-list">
                      <div className="row">
                        {FriendsList.users.map((user, idx) => (
                          <FriendList info={user} key={idx} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default Profile;
