import React from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../../actions/userActions";
import FriendList from "../../components/friendList/friendList";

import "./search.css";
function SearchPage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { search } = useSelector((state) => state);
  const [text, setText] = React.useState("");
  const [users, setUsers] = React.useState(search.users);
  React.useEffect(() => {
    setUsers(search.users);
  }, [search.users]);
  return (
    <div class="main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text) {
            dispatch({
              type: "ADD_MESSAGE",
              payload: {
                type: "error",
                message: "Enter The Name Of User",
              },
            });
          } else {
            dispatch(searchAction(text, userInfo.token));
          }
        }}
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search For SomeOne"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (text) {
                dispatch(searchAction(text, userInfo.token));
              }
            }}
          />
          <div class="input-group-append btn-secondary">
            <button
              class="btn btn-default border"
              type="button"
              onClick={() => {
                if (!text) {
                  dispatch({
                    type: "ADD_MESSAGE",
                    payload: {
                      type: "error",
                      message: "Enter The Name Of User",
                    },
                  });
                } else {
                  dispatch(searchAction(text, userInfo.token));
                }
              }}
            >
              <i class="fa fa-search btn-default"></i>
            </button>
          </div>
        </div>
      </form>
      <br />
      <br />
      <br />
      <br />
      {search.loading ? (
        <div className="loader" style={{ margin: "auto" }}>
          <Loader type="Oval" color="black" height={100} width={100} />
        </div>
      ) : users.length === 0 ? (
        <div style={{ textAlign: "center" }}> No Users Found</div>
      ) : (
        <div className="row">
          {users.map((user, idx) => (
            <FriendList info={user} key={idx} />
          ))}{" "}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
