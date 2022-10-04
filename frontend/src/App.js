import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Users/Home/Home";
import Pay from "./Pages/Users/Payment/payment";
import ListTransaction from "./Pages/Admin/ListTransaction";
import AddArtis from "./Pages/Admin/AddArtis";
import AddMusic from "./Pages/Admin/AddMusic";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import MediaPlay from "./components/MediaPlay/MediaPlay";
import "./App.css";

function App() {
  const [state, dispatch] = useContext(UserContext);
  async function checkAuth() {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }

      const config = {
        Headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      await API.get("/check-auth", config, { validateStatus: () => true })
        .then((response) => {
          const payload = response.data.data.user;
          payload.token = localStorage.token;

          if (!payload) {
            return dispatch({
              type: "AUTH_ERROR",
            });
          }

          dispatch({
            type: "AUTH_SUCCESS",
            payload,
          });
        })
        .catch((err) => {
          dispatch({
            type: "AUTH_ERROR",
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Pay />} />
          <Route path="/list-transaction" element={<ListTransaction />} />
          <Route path="/add-artist" element={<AddArtis />} />
          <Route path="/add-music" element={<AddMusic />} />
          <Route path="/media" element={<MediaPlay />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
