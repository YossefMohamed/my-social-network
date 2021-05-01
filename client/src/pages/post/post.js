import React from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/postAction";
import PuplishCard from "../../components/publishCard/publishCard";

function PostPage(props) {
  const [postId, setPostId] = React.useState(props.match.params.postId);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { getSinglePost } = useSelector((state) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setPostId(props.match.params.postId);
  }, [props.match.params.postId]);
  React.useEffect(() => {
    dispatch(getPost(postId, userInfo.token));
  }, [, postId]);

  //   console.log(getSinglePost);
  return (
    <div>
      {getSinglePost.loading ? (
        <div className="loader">
          <Loader type="Oval" color="black" height={100} width={100} />
        </div>
      ) : Object.keys(getSinglePost.post).length ? (
        <PuplishCard post={getSinglePost.post} />
      ) : (
        // <PuplishCard post={getSinglePost.post} />
        <div className="loader">
          <h1>Not FoundNotNotNotNotNotNotNotNotNot</h1>
        </div>
      )}
    </div>
  );
}

export default PostPage;
