import React from "react";
import { Link } from "react-router-dom";
import FriendEntry from "../friendEntry/friendEntry";

function FriendList(props) {
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
      <div className="col-md-4 col-sm-6 my-3">
        <div className="friend-card">
          <img
            src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
            alt="profile-cover"
            className="img-responsive cover w-100"
          />
          <div className="card-info border">
            <div className="friend-info pt-3 ">
              <Link
                to={`/profile/${props.info._id}`}
                className="pull-right text-green"
              >
                {props.info.friends.length} Friends
              </Link>
              <h5>
                <Link
                  to={`/profile/${props.info._id}`}
                  className="profile-link"
                >
                  {/* <a href="timeline.html" className="profile-link"> */}
                  {props.info.name}
                </Link>
              </h5>
              <p> {props.info.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendList;
