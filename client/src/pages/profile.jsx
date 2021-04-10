import React, { useEffect } from "react";
import FriendList from "../components/friendList/friendList";
import PublishCard from "./../components/publishCard/publishCard";

import "./profile.css";
function Profile(props) {
  const [friends, setFriends] = React.useState(false);
  console.log(friends);
  React.useEffect(() => {
    const myLocation = props.location.search.slice(1);

    if (myLocation === "friends") {
      setFriends(true);
    }
  }, [props.location]);

  const handleFriendList = () => {
    setFriends(true);
  };
  const handleUserPosts = () => {
    setFriends(false);
  };
  return (
    <div className="profil__wrapper">
      <header>
        <div class="container">
          <div class="profile">
            <div class="profile-image">
              <img
                src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                alt=""
              />
            </div>

            <div class="profile-user-settings">
              <h1 class="profile-user-name">janedoe_</h1>

              <button class="btn profile-edit-btn">Edit Profile</button>
            </div>

            <div class="profile-stats">
              <ul>
                <li onClick={handleUserPosts}>
                  <span class="profile-stat-count">164</span> Posts
                </li>

                <li onClick={handleFriendList}>
                  <span class="profile-stat-count">206</span> Following
                </li>
                <li onClick={handleFriendList}>
                  <span class="profile-stat-count">206</span> Followers
                </li>
              </ul>
            </div>

            <div class="profile-bio">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
                 <i class="fas fa-edit pen--edit"></i>
              </p> 
            </div>
          </div>
        </div>
      </header>

      <main>
        <div class="container">
          {!friends ? <>
            <div class="header">
                <div class="card-title">Posts</div>
                <div class="card-amount">26</div>
              </div>
          <PublishCard /> 
          </>: <FriendList />}
        </div>
      </main>
    </div>
  );
}

export default Profile;
