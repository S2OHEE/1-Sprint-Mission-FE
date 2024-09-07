import React from "react";
import BestIcon from "../assets/images/best_icon.png";

export default function BestPostItem({ post }) {
  return (
    <div className="bestPostItemCard">
      <div className="bestIconContainer">
        <img src={BestIcon} alt={post.title} className="bestIcon" />
      </div>
      <div className="post-info">
        <div className="titleImage">
          <h3 className="post-title">{post.title}</h3>
          <img
            src="http://localhost:8000/images/article.svg"
            alt={post.title}
            className="bestPost-image"
          />
        </div>
        <div className="authorLikesDateContainer">
          <div className="authorLikes">
            <p className="post-author">{post.author}</p>
            <p className="post-likes">💙 {post.likeCount}</p>
          </div>
          <p className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
