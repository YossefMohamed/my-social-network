import React from "react";
import MakePost from "../components/makePost/makePost";
import PuplishCard from "../components/publishCard/publishCard";
import "./newsfeed.css";

import { useDispatch, useSelector } from "react-redux";
import { newsFeed } from "./../actions/postAction";
import MyLoader from "../components/myLoader/myLoader";
function NewsFeed(props) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.newsFeed);
  const { token } = useSelector((state) => state.userLogin.userInfo);
  React.useEffect(() => {
    if (!token) props.history.push("/signin");
    else dispatch(newsFeed(0, token));
  }, []);
  return (
    <div className="newsfeed__container">
      <MakePost />
      {posts.loading && [...Array(10)].map((i, idx) => <MyLoader key={idx} />)}
      {posts.posts.length === 0 && (
        <div className="nofriends">There's no posts Please Add Friends</div>
      )}
      {posts.posts.map((i, idx) => (
        <>
          <PuplishCard post={i} />
        </>
      ))}
    </div>
  );
}

export default NewsFeed;
