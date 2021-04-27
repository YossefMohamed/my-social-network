import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost as addPostAction } from "./../../actions/postAction";
import "./makePost.css";
function MakePost() {
  const myRef = React.useRef(null);
  const [upload, setUpload] = React.useState("./upload.jpg");
  const [addPost, setAddPost] = React.useState(false);
  const [content, setContent] = React.useState("");
  const handleUploadPicture = () => {
    myRef.current.click();
  };
  const handlePreviewPicture = (e) => {
    e.preventDefault();
    setUpload(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  };
  const handleAddPost = (e) => {
    setAddPost(true);
  };
  let words = [
    "How's Your Day?",
    "How Do You Do Today ?",
    "What Did you Learn Today?",
  ];
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userLogin.userInfo);
  const handleOnClick = (e) => {
    e.preventDefault();
    if (content) {
      dispatch(addPostAction(content, token));
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          type: "error",
          message: "Please add content to your post !",
        },
      });
    }
    setContent("");
  };
  return (
    <div className="makePost">
      <div className="card">
        <div className="card__container">
          <div className="card__body">
            <div className="card__body--text">
              <textarea
                placeholder={words[Math.floor(Math.random() * (2 - 0 + 1)) + 0]}
                onFocus={handleAddPost}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="card__body--image">
              <img
                src={upload}
                alt="Post-icon"
                onClick={handleUploadPicture}
                style={{ display: `${addPost ? "block" : "none"}` }}
              />
              <input
                type="file"
                ref={myRef}
                accept=".png, .jpg, .jpeg"
                className="input--file"
                onChange={handlePreviewPicture}
              />
            </div>
          </div>
          <div className="add__post">
            <button
              style={{ display: `${addPost ? "block" : "none"}` }}
              onClick={handleOnClick}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakePost;
