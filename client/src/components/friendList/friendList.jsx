import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FriendEntry from "../friendEntry/friendEntry";

function FriendList(props) {
  const [online, setOnline] = React.useState(false);
  const { onlineFriends } = useSelector((state) => state);
  const { userInfo } = useSelector((state) => state);
  React.useEffect(() => {
    onlineFriends[props.info._id] === true && setOnline(true);
  }, [onlineFriends]);
  React.useEffect(() => {
    onlineFriends[props.info._id] === true && setOnline(true);
    String(userInfo._id) === String(props.info._id) && setOnline(true);
  }, []);

  return (
    // <div>
    //   <main className="friend__card--wrapper">
    //     {/* <div class="container">
    //       <PublishCard />
    //     </div> */}

    //     <div class="app">
    //       <div class="wrapper">
    //         <div class="card-v2">
    //           <div class="header">
    //             <div class="card-title">Friends</div>
    //             <div class="card-amount">{props.friends.length}</div>
    //           </div>
    //           <div class="content">
    //             <div class="contact-list">
    //               {props.friends.length ? (
    //                 props.friends.map((friend, idx) => {
    //                   return <FriendEntry key={idx} friend={friend} />;
    //                 })
    //               ) : (
    //                 <h2>You Have No Friends</h2>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
    <>
      <div className="col-xl-4 col-lg-6 my-3 ">
        <div className="friend-card p-md-4">
          {online ? (
            <div className="status">
              <i className="fa fa-circle online"></i>{" "}
            </div>
          ) : (
            <div className="status">
              <i className="fa fa-circle offline"></i>{" "}
            </div>
          )}
          <Link to={`/profile/${props.info._id}`} className="profile-link">
            <img
              src={`/static/images/${props.info.image}`}
              alt="profile-cover"
              className="img-responsive cover w-100"
            />
          </Link>
          <div className="card-info border card-info border p-md-3 p-1">
            <div className="friend-info">
              <Link
                to={`/profile/${props.info._id}`}
                className="pull-right text-green"
              >
                {props.info.friends.length} Friends
              </Link>
              <div className="py-2">
                <Link
                  to={`/profile/${props.info._id}`}
                  className="profile-link"
                >
                  {/* <a href="timeline.html" className="profile-link"> */}
                  {props.info.name}
                </Link>
              </div>
              <span> {props.info.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendList;
