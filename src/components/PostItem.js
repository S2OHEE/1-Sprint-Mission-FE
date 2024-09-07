import React from "react";
import AuthorProfile from "../assets/images/profile-image.png";

export default function PostItem({ post }) {
  return (
    <div className="postItem">
      <div className="postHeader">
        <h3 className="postTitle">{post.title}</h3>
        <img
          src="http://localhost:8000/images/article.svg"
          alt={post.title}
          className="bestPost-image"
        />
      </div>
      <div className="postFooter">
        <div className="postAuthorDate">
          <img src={AuthorProfile} alt="Profile" className="profileImage" />
          <span className="authorName">{post.author}</span>
          <span className="postDate">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span className="likeCount">💙 {post.likeCount}</span>
      </div>
    </div>
  );
}
