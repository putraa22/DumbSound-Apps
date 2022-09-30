import React from "react";
import HeroBannerlogo from "../../assets/banner.png";
import Title from "../../assets/title.png";
import "./HeroBanner.scss";

const HeroBanner = () => {
  return (
    <div className="app__hero-banner">
      <img src={HeroBannerlogo} alt="Hero" />
      <div className="hero__banner-title">
        <img src={Title} alt="caption" />
      </div>
    </div>
  );
};

export default HeroBanner;
