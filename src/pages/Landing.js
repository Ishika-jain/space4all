"use client";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Drawer,
  TextField,
} from "@mui/material";
import SpaceBackground from "../components/SpaceBackground";
import RocketIcon from "@mui/icons-material/Rocket";
import { UserContext } from "../context/UserContext"; // adjust path if needed
import MenuBookIcon from "@mui/icons-material/MenuBook"
// function SpaceBackground() {
//   return (
//     <>
//       <Stars
//         radius={100}
//         depth={50}
//         count={5000}
//         factor={4}
//         saturation={0}
//         fade
//         speed={1}
//       />
//       <ambientLight intensity={0.3} />
//       <pointLight position={[10, 10, 10]} intensity={0.5} />
//     </>
//   );
// }

export default function Landing() {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const handleBookClick = () => navigate("/ReadBook");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState({ name: user.name, age: user.age });

  const handleDrawer = (state) => () => setDrawerOpen(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(form);
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        sx={{ position: "relative", overflow: "hidden" }}
      >
        
        <SpaceBackground height="100vh" /> 


        <Box sx={{ position: "relative", zIndex: 10 }}>
          <AppBar
            position="static"
            sx={{
              background: "transparent",
              boxShadow: "none",
              py: 2,
            }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex" alignItems="center" gap={1}>
                <RocketIcon sx={{ fontSize: 32, color: "#ff9800" }} />
                <Typography variant="h5" fontWeight="bold" color="white">
                  Space4All
                </Typography>
              </Box>
              <Box>
                <Button
                  color="inherit"
                  sx={{ mx: 1 }}
                  onClick={handleDrawer(true)}
                >
                  Profile
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawer(false)}
          >
            <Box sx={{ width: 260, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Edit User Info
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                sx={{ background: "#ff9800", mt: 2 }}
                onClick={handleSave}
                fullWidth
              >
                Save
              </Button>
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "gray", textAlign: "center" }}
              >
                Current: {user.name}, {user.age} yrs
              </Typography>
            </Box>
          </Drawer>

          <Container maxWidth="lg" sx={{ py: 12, textAlign: "center", paddingBottom:'30px' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
              }}
            >
              Explore the{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff9800,#f50057,#29b6f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Amazing World
              </span>{" "}
              of Solar Weather
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: "700px",
                mx: "auto",
                mb: 4,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Journey through space and discover how the Sun affects our planet!
              Learn about solar flares, magnetic storms, and the incredible
              science behind space weather.
            </Typography>
          </Container>
           <Box
        onClick={handleBookClick}
        sx={{
          width: 300,
          height: 300,
          margin: "0 auto",
          perspective: "1500px",
          cursor: "pointer",
          "&:hover .book": {
            transform: "scale(1.1) translateZ(30px)",
          },
        }}
      >
        <Box
          className="book"
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "all 0.6s ease",
          }}
        >
          {/* Spine */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "10px",
              height: "100%",
              background: "linear-gradient(to right, #0f1f3c 0%, #1a3256 50%, #0f1f3c 100%)",
              borderRadius: "10px 0 0 10px",
              transform: "translateZ(1px)",
              boxShadow: "inset -3px 0 10px rgba(0,0,0,0.5), inset 3px 0 10px rgba(0,0,0,0.3)",
            }}
          />

          {/* Pages */}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "15px",
              bottom: "15px",
              left:'275px',
              width: "15px",
              background: "linear-gradient(to right,#f8f8f8 0%,#e0e0e0 20%,#f8f8f8 40%,#e0e0e0 60%,#f8f8f8 80%,#e0e0e0 100%)",
              transform: "translateX(25px) translateZ(-12px) rotateY(5deg)",
              boxShadow: "-3px 0 10px rgba(0,0,0,0.3)",
              borderRadius: "0 6px 6px 0",
            }}
          />

          {/* Cover */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #0a1628 0%, #1a2f52 50%, #2d1b4e 100%)",
              borderRadius: "10px",
              boxShadow: "0 25px 70px rgba(0,0,0,0.9), inset 0 0 100px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Sun */}
    <Box
  sx={{
    position: "absolute",
    top: "50px",
    left: "10rem",
    position:'absolute',
    left:'210px',
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "radial-gradient(circle, #FFEB3B 0%, #FBC02D 90%)",
    boxShadow: "0 0 40px rgba(255, 235, 59, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .spikes": {
      position: "absolute",
      width: "0px",
      height: "0px",
      top: "40px",
      left: "-50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "spin 12s linear infinite",
    },
    "& .spikes div": {
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "25px solid #FBC02D",
      transformOrigin: "50% 100%",
    },
  }}
>
  {/* Spikes */}
  <Box className="spikes">
    {[...Array(12)].map((_, i) => (
      <Box
        key={i}
        sx={{
          transform: `rotate(${i * 30}deg) translateY(-60px)`,
        }}
      />
    ))}
  </Box>

  {/* Sun body */}
  <Box
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: "radial-gradient(circle, #FFEE58 0%, #FBC02D 80%)",
      boxShadow: "inset 0 0 20px rgba(255, 193, 7, 0.8)",
      left:'30px'
    }}
  />
</Box>


              {/* Title */}
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  lineHeight: 1.1,
                  marginTop:'150px'
                }}
              >
                SPACE<br />WEATHER
              </Typography>

              {/* Subtitle */}
              <Typography
                sx={{
                  color: "#d0d0d0",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                Discover how the Sun affects Earth!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" pt={2} paddingTop={"60px"}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                background: "#ff9800",
                "&:hover": { background: "#fb8c00" }
              }}
              startIcon={<RocketIcon />}
            >
              Start Exploring
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderColor: "white",
                color: "white",
                "&:hover": { background: "rgba(255,255,255,0.1)" }
              }}
              startIcon={<MenuBookIcon />}
            >
              Read Flipbook
            </Button>
          </Box>
          
          <Box sx={{ pt: 8, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              A NASA Space Apps Challenge 2025 Project
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.6)" }}
            >
              Made with ❤️ for curious minds everywhere
            </Typography>
          </Box>
        </Box>

       

        <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        body {
          background: linear-gradient(180deg, rgb(10, 15, 35) 0%, rgb(25, 15, 45) 50%, rgb(15, 10, 30) 100%);
          min-height: 100vh;
        }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}



      `}</style>
      </Box>
    </>
  );
}
