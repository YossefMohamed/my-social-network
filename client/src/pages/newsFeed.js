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
  const [posts, setPosts] = React.useState(postsFromState.posts);
  const [page, setPage] = React.useState(0);
  const { token } = useSelector((state) => state.userLogin.userInfo);
  const myRef = React.useRef();
  React.useEffect(() => {
    if (!token) props.history.push("/signin");
    else dispatch(newsFeed(page, token));
  }, []);

  React.useEffect(() => {
    dispatch(newsFeed(page, token));
  }, [page]);
  React.useEffect(() => {
    setPosts((p) => [...p, ...postsFromState.posts]);
    
  }, [page]);
  React.useEffect(() => {
    setPosts((p) => [...p, ...postsFromState.posts]);
    
  }, []);
  
  // console.log(posts);
  // console.log(posts);
  // console.log(posts);
  const handleInfiniteScroll = () => {
    if (page < docNum) {
      setPage((p) => p + 1);
    }
  };

  React.useEffect(() => {
    
  const observer = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting &&page < docNum && !postsFromState.loading)
        setPage(prevPage => prevPage+1)
  },{})
  
  observer.observe(myRef.current)

  }, []);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    console.log(posts);
    // console.log(page);
  return (
    <div className="newsfeed__container">
      <MakePost />
      {postsFromState.loading &&
        [...Array(10)].map((i, idx) => <MyLoader key={idx} />)}
      {postsFromState.posts.length === 0 && (
        <div className="nofriends">There's no posts Please Add Friends</div>
      )}
      {posts.map((i, idx) => (
        <>
          <PuplishCard post={i} />
        </>
      ))}

      {page >= docNum ? (
        <h1>No  Posts </h1>
      ) : (
        <h1 ref={myRef} onClick={handleInfiniteScroll}>
          Loading...
        </h1>
      )}
    </div>
  );
}

export default NewsFeed;
