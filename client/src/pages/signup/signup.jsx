import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userActions";
import LoaderComponent from "../../components/loader/Loader";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Signup(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();
  function alert(payLoad) {
    toast.error(<div className="toast--container">{payLoad}</div>);
  }
  React.useEffect(() => {
    console.log(userRegister.error);
    userRegister.error && alert(userRegister.error);
  }, [userRegister.error]);
  React.useEffect(() => {
    Object.keys(userLogin.userInfo).length && props.history.push("/");
  }, [userLogin.userInfo]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    userRegister.error = null;
    // console.log(email, password, confirmPassword, name);
    if (!name || !password || !email || !confirmPassword) {
      alert("Please Fill All The Fields !!!");
    } else if (confirmPassword !== password) {
      alert("Password And Password Confirmation Not Equal");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="signin">
      <ToastContainer />
      {userRegister.loading ? (
        <LoaderComponent />
      ) : (
        <div class="login">
          <div class="login-triangle"></div>

          <h2 class="login-header">Log in</h2>

          <form class="login-container">
            <p>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <p>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>
            <p>
              <input
                type="password"
                placeholder="Password Confirmation"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </p>
            <p>
              <button className="signup" onClick={handleOnSubmit}>
                SignUp
              </button>
              <input
                type="submit"
                value="Log in"
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push("/signin");
                }}
              />
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
