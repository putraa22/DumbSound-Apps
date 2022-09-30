import React, { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
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

export default function TransitionsModal({ handleCloseRegister, openRegister }) {
  const [state, dispatch] = useContext(UserContext);
  const [dataRegister, setDataRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  function handleChangeRegister(e) {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmitRegister() {
    try {
      const body = {
        fullName: dataRegister.fullName,
        email: dataRegister.email,
        password: dataRegister.password,
        gender: dataRegister.gender,
        phone: dataRegister.phone,
        address: dataRegister.address,
      };

      await API.post("/register", body, { validateStatus: () => true })
        .then((response) => {
          console.log(response);
          if (response.data.code >= 400) {
            return Error({ message: `Mohon isikan form registrasi yang valid!` });
          }
          handleCloseRegister();
          // handleShowLogin();
          // Success({ message: `Register berhasil! Silahkan Login` });
        })
        .catch((err) => {
          Error({ message: `${err.response.data.message}` });
        });
    } catch (err) {
      Error({ message: `${err}` });
    }
  }

  return (
    <div style={{ backgroundColor: "#161616" }}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openRegister}
        onClose={handleCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRegister}>
          <Box sx={style}>
            <TextField
              sx={{
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              required
              type="email"
              name="email"
              onChange={handleChangeRegister}
              value={dataRegister.email}
              id="outlined-required"
              label="Email"
            />
            <TextField
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              id="outlined-password-input"
              onChange={handleChangeRegister}
              name="password"
              value={dataRegister.password}
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              sx={{
                marginBottom: "1rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              onChange={handleChangeRegister}
              name="fullName"
              id="outlined-name"
              label="Full Name"
              value={dataRegister.fullName}
            />
            <TextField
              sx={{
                marginBottom: "1rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              id="outlined-helperText"
              onChange={handleChangeRegister}
              name="gender"
              label="Gender"
              value={dataRegister.gender}
            />
            <TextField
              sx={{
                marginBottom: "1rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              id="outlined-number"
              onChange={handleChangeRegister}
              name="phone"
              value={dataRegister.phone}
              label="Phone"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              sx={{
                marginBottom: "2rem",
                bgcolor: "#D2D2D2",
                color: "#fff",
                borderRadius: 2,
              }}
              onChange={handleChangeRegister}
              name="address"
              id="outlined-multiline-static"
              label="Address"
              multiline
              rows={3}
              value={dataRegister.address}
            />
            <Button
              sx={{
                backgroundColor: "#EE4622",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
              }}
              onClick={handleSubmitRegister}
            >
              Register
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
