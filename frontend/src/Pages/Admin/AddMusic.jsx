import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Container } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

function AddMusic() {
  let navigate = useNavigate();
  const [artist, setArtist] = useState([]); // Store All Artist
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    attache: "",
    year: "",
    artist_id: "",
  });
  const [preview, setPreview] = useState();
  const [audio, setAudio] = useState();

  const getArtist = async () => {
    try {
      const response = await API.get("/artists");
      setArtist(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log("punya si", e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file" && e.target.name === "thumbnail") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    if (e.target.type === "file" && e.target.name === "attache") {
      setAudio(e.target.files[0].name);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("attache", form.attache[0], form.attache[0].name);
      formData.set("year", form.year);
      formData.set("artist_id", form.artist_id);

      const response = await API.post("/music", formData, config);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <div className="song-page">
      <Container maxWidth="lg">
        {/* {message && (
            <div class="alert alert-success message-success-music" role="alert">
              {message}
            </div>
          )} */}
        <h1 className="text-incoming"> Add Music</h1>
        {/* {preview && (
            <div className="container-cover-song">
              <img src={preview} className="cover-preview" alt="preview-pict" />
            </div>
          )} */}
        <Form className="form-song" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="text">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Control className="bg-dark text-light input-form-music" type="text" name="title" placeholder="Title" bordered required onChange={handleChange} />

              <div>
                <label className="label-input-cover">
                  Attach Thumbnail <AttachFile size="2em" style={{ color: "#ee4622" }} />
                  <input type="file" name="thumbnail" onChange={handleChange} />
                </label>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="number" name="year" placeholder="Year" bordered required onChange={handleChange} />
          </Form.Group>

          <Form.Control
            as="select"
            className="mr-sm-2 mb-3 bg-dark text-light form-input-type-music"
            id="inlineFormCustomSelect"
            name="artist_id"
            onChange={handleChange}
            //   onChange={handleOnChangeOptionSinger}
          >
            <option value="0">Singer</option>
            {artist?.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </Form.Control>

          <div style={{ display: "flex", justifyContent: "start" }}>
            <label className="label-input-song">
              Attach
              <input type="file" name="attache" onChange={handleChange} />
            </label>
            {audio && (
              <p
                className="audio-name"
                style={{
                  color: "white",
                  alignItems: "center",
                  lineHeight: "70px",
                  marginLeft: "20px",
                }}
              >
                {audio}
              </p>
            )}
          </div>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button type="submit" variant="primary" className="button-submit-artist">
              Add Song
            </Button>
          </Box>
        </Form>
      </Container>
    </div>
  );
}

export default AddMusic;
