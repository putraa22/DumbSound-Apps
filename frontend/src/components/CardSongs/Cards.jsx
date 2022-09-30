import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import MediaPlay from "../MediaPlay/MediaPlay";
import Image from "../../assets/avatar.png";
import "./Cards.scss";

const Cards = (props) => {
  // const [songs, setSongs] = useState([]);
  const [song, setSong] = useState();
  // const [artists, setArtists] = useState([]);
  // const [paymentList, setPaymentList] = useState([]);
  // const [statusPayment, setStatusPayment] = useState();
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

  return (
    <Card
      sx={{
        Width: "192px",
        bgcolor: "#3A3A3A",
        color: "#fff",
        marginRight: "1rem",
        marginBottom: "1rem",
      }}
    >
      <CardActionArea onClick={handleShowAudio}>
        <CardMedia
          sx={{
            padding: 1,
          }}
          component="img"
          height="140"
          image={Image}
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
            Circles
            <span style={{ fontWeight: 400, fontSize: 14, textIndent: "2rem", alignItems: "center" }}>2019</span>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
            variant="body2"
          >
            Post Malone
          </Typography>
        </CardContent>
      </CardActionArea>
      <MediaPlay audioLists={song} show={showAudio} playIndex={currentPlay} />
    </Card>
  );
};

export default Cards;
