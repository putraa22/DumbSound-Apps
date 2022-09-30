import React from "react";
import { Form, Button } from "react-bootstrap";
import { Box, Container } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

function AddMusic() {
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
        <Form
          className="form-song"
          // onSubmit={handleOnSubmit}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleOnSubmit();
          // }}
        >
          <Form.Group className="mb-3" controlId="text">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Control
                className="bg-dark text-light input-form-music"
                type="text"
                name="title"
                placeholder="Title"
                bordered
                required
                //   onChange={onChange}
              />

              <div>
                <label className="label-input-cover">
                  Attach Thumbnail <AttachFile size="2em" style={{ color: "#ee4622" }} />
                  <input type="file" name="image" />
                </label>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              className="bg-dark text-light input-form-music"
              type="number"
              name="year"
              placeholder="Year"
              bordered
              required
              // onChange={onChange}
            />
          </Form.Group>

          <Form.Control
            as="select"
            className="mr-sm-2 mb-3 bg-dark text-light form-input-type-music"
            id="inlineFormCustomSelect"
            custom
            //   onChange={handleOnChangeOptionSinger}
          >
            <option value="0">Singer</option>
            {/* {singer.map((arr, index) => (
                <option key={index} value={arr.id} name={arr.id}>
                  {arr.name}
                </option>
              ))} */}
          </Form.Control>

          <div style={{ display: "flex", justifyContent: "start" }}>
            <label className="label-input-song">
              Attach
              <input type="file" name="song" />
            </label>

            <p
              className="audio-name"
              style={{
                color: "white",
                alignItems: "center",
                lineHeight: "70px",
                marginLeft: "20px",
              }}
            ></p>
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
