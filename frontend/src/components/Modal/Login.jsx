import React, { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
// import { useMutation } from "react-query";
// import { json, useNavigate } from "react-router-dom";

// import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   textAlign: "Center",
  display: "flex",
  flexDirection: "column",
  width: 400,
  bgcolor: "#161616",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function TransitionsModal({ handleClose, open }) {
  // let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmitLogin() {
    try {
      const body = {
        email: form.email,
        password: form.password,
      };

      await API.post("/login", body, { validateStatus: () => true })
        .then((response) => {
          if (response.data.code === 400) {
            return Error({ message: "Email / Password yang anda masukkan salah!" });
          }
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });
          console.log(state);
        })
        .catch((err) => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ backgroundColor: "#161616" }}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              sx={{
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              required
              onChange={handleChange}
              name="email"
              id="outlined-required"
              label="Email"
              defaultValue=""
            />
            <TextField
              sx={{
                marginTop: "1rem",
                marginBottom: "2rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              onChange={handleChange}
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitLogin();
              }}
            />
            <Button
              sx={{
                backgroundColor: "#EE4622",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
              }}
              onClick={handleSubmitLogin}
            >
              Login
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
