import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Payments, LogoutOutlined, QueueMusic } from "@mui/icons-material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Dropdown } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import ImageLogo from "../../assets/avatar.png";
import { Button } from "@mui/material";
import Login from "../Modal/Login";
import Register from "../Modal/Register";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ResponsiveAppBar = () => {
  const [state, dispatch] = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  function handleLogout() {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    // Success({ message: "Logout berhasil!" });
  }

  const [openRegister, setOpenRegister] = React.useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "transparent",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src={Logo} alt="logo" />
          {!state.isLogin ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <>
                <Button
                  sx={{
                    backgroundColor: "#EE4622",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    marginRight: "1rem",
                  }}
                  onClick={handleOpen}
                >
                  lOGIN
                </Button>
                <Login handleClose={handleClose} open={open} />
                <Button
                  sx={{
                    backgroundColor: "#EE4622",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                  onClick={handleOpenRegister}
                >
                  REGISTER
                </Button>
                <Register handleCloseRegister={handleCloseRegister} openRegister={openRegister} />
              </>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Dropdown>
                  <Dropdown.Toggle variant="black" id="dropdown-basic">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Putra" src={ImageLogo} />
                    </IconButton>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ backgroundColor: "#1F1F1F" }} className="dropdown-menu-end">
                    <div style={{ width: "0", height: "0", borderLeft: "15px solid transparent", borderRight: "15px solid transparent", borderBottom: "15px solid #1F1F1F", position: "absolute", right: "10px", top: "-15px" }}></div>
                    {state.isAdmin ? (
                      <>
                        <Dropdown.Item style={{ color: "#fff" }} className="d-flex align-items-center" onClick={() => navigate("/add-music")}>
                          <QueueMusic />
                          <b className="ms-2">Add Music</b>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ color: "#fff" }} className="d-flex align-items-center" onClick={() => navigate("/add-artist")}>
                          <AccountBoxOutlinedIcon />
                          <b className="ms-2">Add Artis</b>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ color: "#fff" }} className="d-flex align-items-center mt-2" onClick={() => navigate("/list-transaction")}>
                          <ReceiptLongOutlinedIcon />
                          <b className="ms-2">Transaction</b>
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item style={{ color: "#fff" }} className="d-flex align-items-center mt-2" onClick={() => navigate("/payment")}>
                          <Payments className="Nav__icons" />
                          <b className="ms-2">Pay</b>
                        </Dropdown.Item>
                      </>
                    )}

                    <hr style={{ color: "#fff" }} />
                    <Dropdown.Item style={{ color: "#fff" }} className="d-flex align-items-center" onClick={handleLogout}>
                      <LogoutOutlined className="Nav__icons2" />
                      <b className="ms-2">Logout</b>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
