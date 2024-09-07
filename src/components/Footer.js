import React from "react";
import "./Footer.css";
import facebookIcon from "../assets/images/ic_facebook.png"; // 경로 수정
import twitterIcon from "../assets/images/ic_twitter.png"; // 경로 수정
import youtubeIcon from "../assets/images/ic_youtube.png"; // 경로 수정
import instagramIcon from "../assets/images/ic_instagram.png"; // 경로 수정

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="codeit_icon">©codeit - 2024</div>
        <div className="footer_menu">
          <a href="html/privacy.html">Privacy Policy</a>
          <a href="html/FAQ.html">FAQ</a>
        </div>
        <div className="sns_icon">
          <a href="html/facebook.html">
            <img className="FACEBOOK" src={facebookIcon} alt="FACEBOOK" />
          </a>
          <a href="html/x.html">
            <img className="X" src={twitterIcon} alt="X" />
          </a>
          <a href="html/youtube.html">
            <img className="YOUTUBE" src={youtubeIcon} alt="YOUTUBE" />
          </a>
          <a href="html/instagram.html">
            <img className="INSTARGRAM" src={instagramIcon} alt="INSTARGRAM" />
          </a>
        </div>
      </div>
    </footer>
  );
}
