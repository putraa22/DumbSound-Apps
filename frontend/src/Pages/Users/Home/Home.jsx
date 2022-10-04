import React from "react";
import Container from "@mui/material/Container";
import HeroBanner from "../../../components/HeroBanner/HeroBanner";
import Cards from "../../../components/CardSongs/Cards";

import "./Home.scss";
// import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <div className="app__container-home">
        <HeroBanner />
        <div className="home__header">
          <h2>Dengarkan Dan Rasakan</h2>
        </div>
        <Container maxWidth="lg" className="container__card-list">
          <Cards />
        </Container>
      </div>
    </>
  );
};

export default Home;
