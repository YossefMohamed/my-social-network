import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

import "./signin.css";
import LoaderComponent from "../../components/loader/Loader";

function Signin(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  React.useEffect(() => {
    userLogin.error &&
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          type: "error",
          message: userLogin.error,
        },
      });
  }, [userLogin.error]);

  React.useEffect(() => {
    Object.keys(userLogin.userInfo).length && props.history.push("/");
  }, [userLogin.userInfo]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    userLogin.error = null;
    if (!email || !password) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          type: "error",
          message: "Plaese Fill All The Fields !",
        },
      });
    } else {
      dispatch(login(email, password));
    }
  };
  return (
    <div className="signin">
      {userLogin.loading ? (
        <LoaderComponent />
      ) : (
        <div class="login">
          <div class="login-triangle"></div>

          <h2 class="login-header">Log in</h2>

          <form class="login-container">
            <p>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </p>
            <p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </p>
            <p>
              <input type="submit" value="Log in" onClick={handleOnSubmit} />
              <button
                className="signup"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/signup");
                }}
              >
                SignUp
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signin;
