import React from "react";
import MakePost from "../components/makePost/makePost";
import PuplishCard from "../components/publishCard/publishCard";
import "./newsfeed.css";

import { useDispatch, useSelector } from "react-redux";
import { newsFeed } from "./../actions/postAction";
import MyLoader from "../components/myLoader/myLoader";
function NewsFeed(props) {
  const dispatch = useDispatch();
  const postsFromState = useSelector((state) => state.newsFeed);
  const docNum = useSelector((state) => state.DocNum.docNum);
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const deletedPost = useSelector((state) => state.deletedPost.post);
  const addedPosts = useSelector((state) => state.addPost.post);
  let result = [];
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const myRef = React.useRef();
  React.useEffect(() => {
    console.log(userInfo.token);
    if (!userInfo.token) props.history.push("/signin");
    else dispatch(newsFeed(page, userInfo.token));
    setPosts(postsFromState.posts);
  }, []);
  // React.useEffect(() => {
  //   if (addedPosts.length) {
  //     setPosts([...addedPosts]);
  //   }
  // }, [addedPosts]);

  React.useEffect(() => {
    // alert(page);
    if (page < docNum) dispatch(newsFeed(page, userInfo.token));
  }, [page]);
  React.useEffect(() => {
    if (page <= docNum) setPosts((p) => [...postsFromState.posts]);
  }, [postsFromState.posts]);

  React.useEffect(() => {
    if (deletedPost._id) {
      setPosts([...posts.filter((p1) => p1._id !== deletedPost._id)]);
      dispatch({
        type: "ADD_MESSAGE",
        payload: { type: "success", message: "Post has been deleted !" },
      });
      dispatch({
        type: "READY_DELETE",
      });
    }
    //alert
  }, [deletedPost]);
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < docNum && !postsFromState.loading)
        setPage((prevPage) => prevPage + 1);
    });
    if (myRef.current) observer.observe(myRef.current);
    console.log(page < docNum);
  }, []);

  // console.log(page);
  return (
    <div className="newsfeed__container">
      <MakePost />
      {postsFromState.loading &&
        [...Array(10)].map((i, idx) => <MyLoader key={idx} />)}

      {posts && (
        <>
          {" "}
          {posts.length === 0 && (
            <div className="nofriends">There's no posts Please Add Friends</div>
          )}
          {posts.map((i, idx) => (
            <>
              <PuplishCard post={i} />
            </>
          ))}{" "}
        </>
      )}

      {page >= docNum ? (
        posts.length && (
          <div>
            <h1>No More Posts </h1>
            <br />
            <br />
          </div>
        )
      ) : (
        <h1 ref={myRef}>Loading...</h1>
      )}
    </div>
  );
}

export default NewsFeed;
