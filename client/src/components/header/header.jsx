import React, { useState } from "react";
import "./header.css";
import { FaUserFriends } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { BiSearchAlt2, BiBell, BiArrowFromLeft } from "react-icons/bi";
import { BiNews } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
const Navbar = (props) => {
  console.log(props);
  const [newNot, setNewNot] = useState(false);
  const [navWider, setNavWider] = useState(false);
  let NavStyle;
  const handleNavWider = (e) => {
    setNavWider((s) => !s);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { hasNew } = useSelector((state) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setNewNot(hasNew);
  }, [hasNew]);
  React.useEffect(() => {
    let x = document.querySelectorAll(".nav--text");
    if (navWider) {
      x.forEach((e) => {
        e.style.display = "block";
      });
    } else {
      x.forEach((e) => {
        e.style.display = "none";
      });
    }
  }, [navWider]);
  return (
    <div
      className="nav"
      style={{
        width: `${navWider ? "20rem" : "6rem"}`,
        display: `${Object.keys(userLogin.userInfo).length ? "block" : "none"}`,
      }}
    >
      <div className="nav__container">
        <div className="nav__container--icons">
          <div className="nav__item" onClick={(e) => handleNavWider(e)}>
            <span
              className="nav__link"
              style={{
                transform: `${navWider ? "rotate(180deg)" : "rotate(0deg)"}`,
              }}
            >
              <BiArrowFromLeft size="3.5rem" />
            </span>
          </div>
          <div className="nav__item">
            <Link className="nav__link" to="/">
              <BiNews size="3.5rem" />
              <span className="nav--text">NewsFeed</span>
            </Link>
          </div>
          <div
            className="nav__item"
            style={{ background: `${newNot && "red"}` }}
          >
            <Link className="nav__link" to="/notifcations">
              <BiBell size="3.5rem" />
              <span className="nav--text">Notification</span>
            </Link>
          </div>
          <div className="nav__item">
            <Link
              className="nav__link"
              to={`/profile/${userLogin.userInfo._id}`}
            >
              <FaUserFriends size="3.5rem" />
              <span className="nav--text">Friends</span>
            </Link>
          </div>
          <div className="nav__item">
            <Link className="nav__link" to="/chat">
              <AiFillMessage size="3.5rem" />
              <span className="nav--text">Chatting</span>
            </Link>
          </div>
          <div className="nav__item">
            <Link className="nav__link" to="/search">
              <BiSearchAlt2 size="3.5rem" />
              <span className="nav--text">Search</span>
            </Link>
          </div>
          <div
            className="nav__item"
            onClick={() => {
              dispatch({
                type: "USER_LOGOUT",
              });
              props.history.push("/signin");
            }}
          >
            <Link className="nav__link">
              <FiLogOut size="3.5rem" />
              <span className="nav--text">LogOut</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
