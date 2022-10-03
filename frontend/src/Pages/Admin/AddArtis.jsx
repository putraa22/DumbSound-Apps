import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function AddArtis() {
  let navigate = useNavigate();
  const [dataArtist, setDataArtist] = useState({
    name: "",
    old: "",
    type: "",
    startCareer: "",
  });

  const handleChange = (e) => {
    setDataArtist({
      ...dataArtist,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitArtist = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.post("/artist", dataArtist, config);
      console.log(response);
      navigate("/add-music");
    } catch (error) {
      console.log(error);
    }
  });

  console.log(dataArtist);

  return (
    <div className="artist-form-page">
      <Container maxWidth="lg">
        <h1 className="text-add-artist"> Add Artist</h1>
        <Form onSubmit={(e) => handleSubmitArtist.mutate(e)}>
          {/* {message && (
            <div class="alert alert-success message-success-music" role="alert">
              {message}
            </div>
          )} */}
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="text" name="name" placeholder="Name" bordered required onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="number" name="old" onChange={handleChange} placeholder="Old" bordered required />
          </Form.Group>
          <Form.Control className="mr-sm-2 mb-3 bg-dark text-light form-input-type-artist" id="inlineFormCustomSelect" type="text" name="type" placeholder="Type" onChange={handleChange} />
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="number" name="startCareer" onChange={handleChange} placeholder="Start a Career" bordered required />
          </Form.Group>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button type="submit" variant="primary" size="lg" className="button-submit-artist">
              Add Artist
            </Button>
          </Box>
        </Form>
      </Container>
    </div>
  );
}

export default AddArtis;
