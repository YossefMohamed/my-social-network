import React from "react";
import MakePost from "../components/makePost/makePost";
import PuplishCard from "../components/publishCard/publishCard";
import "./newsfeed.css";

import { useDispatch, useSelector } from "react-redux";
import { newsFeed } from "./../actions/postAction";
import MyLoader from "../components/myLoader/myLoader";
function NewsFeed(props) {
  const dispatch = useDispatch();
  const postsFromRedux = useSelector((state) => state.newsFeed);
  const [posts, setPosts] = React.useState(postsFromRedux.posts);
  const { token } = useSelector((state) => state.userLogin.userInfo);
  const myRef = React.useRef();
  React.useEffect(() => {
    if (!token) props.history.push("/signin");
    else dispatch(newsFeed(0, token));
  }, []);
  React.useEffect(() => {
    setPosts(postsFromRedux.posts);
  }, [postsFromRedux.posts]);
  React.useEffect(() => {
    const y = myRef.current.getBoundingClientRect().y;
    console.log(y);
    console.log(y);
    console.log(y);
    console.log(y);
    console.log(y);
    if (y <= 300) {
      dispatch(newsFeed(1, token));
    }
  }, [myRef.current]);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  console.log(posts);
  return (
    <div className="newsfeed__container">
      <MakePost />
      {postsFromRedux.loading &&
        [...Array(10)].map((i, idx) => <MyLoader key={idx} />)}
      {posts.length === 0 && (
        <div className="nofriends">There's no posts Please Add Friends</div>
      )}
      {posts.map((i, idx) => (
        <>
          <PuplishCard post={i} />
        </>
      ))}
      <h1 ref={myRef}>Scroll Again</h1>
    </div>
  );
}

export default NewsFeed;
