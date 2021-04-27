import React from "react";
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
      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="list--container container">
          <div className="create-post"></div>
          <div className="friend-list">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="friend-card">
                  <img
                    src="https://via.placeholder.com/400x100/6495ED"
                    alt="profile-cover"
                    className="img-responsive cover"
                  />
                  <div className="card-info">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="user"
                      className="profile-photo-lg"
                    />
                    <div className="friend-info">
                      <a href="#" className="pull-right text-green">
                        My Friend
                      </a>
                      <h5>
                        <a href="timeline.html" className="profile-link">
                          Sophia Lee
                        </a>
                      </h5>
                      <p>Student at Harvard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendList;
