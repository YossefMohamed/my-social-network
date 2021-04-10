import React from "react";
import MakePost from "../components/makePost/makePost";
import PuplishCard from "../components/publishCard/publishCard";
import "./newsfeed.css";
function NewsFeed() {
  return (
    <div className="newsfeed__container">
      <MakePost />
      <PuplishCard />
    </div>
  );
}

export default NewsFeed;
