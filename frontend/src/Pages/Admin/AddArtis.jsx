import { Box, Container } from "@mui/material";
import React from "react";
import { Form, Button } from "react-bootstrap";

function AddArtis() {
  return (
    <div className="artist-form-page">
      <Container maxWidth="lg">
        <h1 className="text-add-artist"> Add Artist</h1>
        <Form>
          {/* {message && (
            <div class="alert alert-success message-success-music" role="alert">
              {message}
            </div>
          )} */}
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="text" name="name" placeholder="Name" bordered required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="number" name="age" placeholder="Age" bordered required />
          </Form.Group>
          <Form.Control as="select" className="mr-sm-2 mb-3 bg-dark text-light form-input-type-artist" id="inlineFormCustomSelect" custom>
            <option value="0">Type</option>
            <option value="Band" name="band">
              Band
            </option>
            <option value="Solo" name="solo">
              Solo
            </option>
          </Form.Control>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control className="bg-dark text-light input-form-music" type="number" name="startCareer" placeholder="Start a Career" bordered required />
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
