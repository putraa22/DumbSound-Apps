import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/lib/styles/index.less";

function MediaPlay(props) {
  const options = {
    showDownload: false,
    mode: "full",
    showReload: false,
    showPlayMode: false,
    showThemeSwitch: false,
    toggleMode: true,
    preload: false,
    autoPlay: false,
  };

  return <ReactJkMusicPlayer playIndex={props.playIndex} audioLists={props.audioLists} {...options} />;
}

export default MediaPlay;
