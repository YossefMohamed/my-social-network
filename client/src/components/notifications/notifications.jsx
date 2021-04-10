import React from "react";
import "./notications.css";
function Notifications() {
  return (
    <div className="content__container">
      <div id="content">
        <div class="notification green">
          <div class="info">
            <h1>
              This is a <a href="https://goo.gl/GykQEn">notification</a>
            </h1>
            <p>You have been notified</p>
          </div>
          <div class="icon">
            <img src="./upload.jpg" />
          </div>
        </div>

        <div class="notification green">
          <div class="info">
            <h1>
              This is a <a href="https://goo.gl/GykQEn">notification</a>
            </h1>
            <p>You have been notified</p>
          </div>
          <div class="icon">
            <img src="./logo192.png" />
          </div>
        </div>
        {/* <div class="notification red">
          <div class="info">
            <h1>
              <a href="https://goo.gl/IiwBDn">ruandre</a> followed you
            </h1>
            <p>
              You have a new follower! Feel the fame flow through your vains!
            </p>
          </div>
          <div class="icon">
            <i class="fa fa-heart"></i>
          </div>
        </div>

        <div class="notification blue">
          <div class="info">
            <h1>
              <a href="https://goo.gl/I8lNLu">Windows 10</a> preview is here
            </h1>
            <p>
              Windows 10 represents the first step of a whole new generation of
              Windows. Windows 10 unlocks new experiences for customers to work,
              play and connect.
            </p>
            <a href="https://goo.gl/Z83wbD" class="button">
              Full story
            </a>
            <a href="#" class="button gray">
              Dismiss
            </a>
          </div>
          <div class="icon">
            <i class="fa fa-newspaper-o"></i>
          </div>
        </div>

        <div class="notification purple">
          <div class="info">
            <h1>
              <a>8 min</a> to home with a bicycle
            </h1>
            <p>
              Bicycle 2.4 km, 8 min. Use caution - may involve errors or
              sections not suited for bicycling
            </p>
            <a href="https://goo.gl/YbvshI" class="button">
              Navigate
            </a>
            <a href="#" class="button gray">
              Dismiss
            </a>
          </div>
          <div class="icon">
            <i class="fa fa-bicycle"></i>
          </div>
        </div>

        <div class="notification blue"> */}
        {/* <div class="info">
            <h1>
              <a href="https://goo.gl/C1PuL7">@munkkeli</a> followed you!
            </h1>
            <p>
              You have a new follower! Feel the fame flow through your vains!
            </p>
          </div>
          <div class="icon">
            <i class="fa fa-twitter"></i>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Notifications;
