import React from "react";
import FriendEntry from "../friendEntry/friendEntry";

function FriendList() {
  return (
    <div>
      <main className="friend__card--wrapper">
        {/* <div class="container">
          <PublishCard />
        </div> */}

        <div class="app">
          <div class="wrapper">
            <div class="card-v2">
              <div class="header">
                <div class="card-title">Contacts</div>
                <div class="card-amount">26</div>
              </div>
              <div class="content">
                <div class="contact-list">
                  <FriendEntry />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FriendList;
