import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import MediaPlay from "../MediaPlay/MediaPlay";
// import Image from "../../assets/avatar.png";
import "./Cards.scss";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";

const Cards = ({ playIndex, audioLists }) => {
  // let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const path = "http://localhost:5000/uploads/";
  // audioLists = { song }
  // show = { showAudio }
  // playIndex = { currentPlay }
  const [songs, setSongs] = useState([]);
  // const [artists, setArtists] = useState([]);
  const [song, setSong] = useState([]);
  const [currentPlay, setCurrentPlay] = useState(0);
  const [showAudio, setShowAudio] = useState(false);

  const handleShowAudio = (id) => {
    if (showAudio) {
      setShowAudio(false);
      setCurrentPlay(id);
      setTimeout(() => setShowAudio(true), 500);
    } else {
      setShowAudio(true);
    }
  };

  let { data: artists, isLoading } = useQuery("MusicsCache", async () => {
    const response = await API.get("/artists");

    return response.data.data;

    // const result = response.data.data.map((item) => ({
    //   title: item.title,
    //   singer: item.artist.name,
    //   cover: item.thumbnail,
    //   musicSrc: path + item.attache,
    // }));
    // setSong(result);
  });

  const loadMusic = async () => {
    try {
      const response = await API.get("/musics");
      setSongs(response.data.data);

      // const result = response.data.data.map((item) => ({
      //   title: item.title,
      //   singer: item.artists.name,
      //   cover: path + item.thumbnail,
      //   musicSrc: path + item.attache,
      // }));
      // setSong(result);
      // console.log("ini result", result);
    } catch (error) {
      console.log(error);
    }
  };

  // const loadArtist = async () => {
  //   try {
  //     const response = await API.get("/artists");
  //     setArtists(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    loadMusic();
  }, []);

  return (
    <>
      {songs?.map((item, index) => (
        <Card
          key={index}
          sx={{
            Width: "192px",
            bgcolor: "#3A3A3A",
            color: "#fff",
            marginRight: "1rem",
            marginBottom: "1rem",
          }}
          onClick={() => handleShowAudio(index)}
        >
          <CardActionArea>
            <CardMedia
              sx={{
                padding: 1,
              }}
              component="img"
              height="140"
              image={item.thumbnail}
              alt="Image"
            />
            <CardContent>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                variant="h5"
              >
                {item.title}
                <span style={{ fontWeight: 400, fontSize: 14, textIndent: "2rem", alignItems: "center" }}>{item.year}</span>
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
                variant="body2"
              >
                {isLoading ? (
                  <></>
                ) : (
                  artists?.map((artis) => {
                    let artisName = "";
                    if (artis.id === item.artist_id) {
                      artisName = artis.name;
                    }
                    return artisName;
                  })
                )}
              </Typography>
            </CardContent>
          </CardActionArea>
          <audio controls autoplay>
            <source src={item.attache} type="audio/mpeg" />
          </audio>
        </Card>
      ))}
      {/* <div>
        <MediaPlay audioLists={song} show={showAudio} playIndex={currentPlay} />
      </div> */}
    </>
  );
};

export default Cards;
