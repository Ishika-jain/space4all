"use client"

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from "@mui/material"
import bg from "../assets/bg.jpeg";


import RocketIcon from "@mui/icons-material/Rocket"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import SecurityIcon from "@mui/icons-material/Security"

function SpaceBackground() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </>
  )
}

export default function Landing() {
    const navigate = useNavigate();
  return (
<>
      <Navbar />
    

    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Box sx={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <SpaceBackground />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </Box>


      <Box sx={{ position: "relative", zIndex: 10 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            boxShadow: "none",
            py: 2
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <RocketIcon sx={{ fontSize: 32, color: "#ff9800" }} />
              <Typography variant="h5" fontWeight="bold" color="white">
                Solar Weather Explorer
              </Typography>
            </Box>
            <Box>
              <Button color="inherit" sx={{ mx: 1 }}>
                About
              </Button>
              <Button color="inherit" sx={{ mx: 1 }}>
                Learn
              </Button>
              <Button color="inherit" sx={{ mx: 1 }}>
                Contact
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: 12, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "999px",
              px: 2,
              py: 1,
              backdropFilter: "blur(6px)",
              mb: 5
            }}
          >
            <WbSunnyIcon
              sx={{ color: "#ff9800", animation: "pulseGlow 3s infinite ease-in-out" }}
            />
            <Typography variant="body2" fontWeight="500" color="white">
              NASA Space Apps Challenge 2025
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" }
            }}
          >
            Explore the{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#ff9800,#f50057,#29b6f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Amazing World
            </span>{" "}
            of Solar Weather
          </Typography>

          <Typography
            variant="h6"
            sx={{ maxWidth: "700px", mx: "auto", mb: 4, color: "rgba(255,255,255,0.8)" }}
          >
            Journey through space and discover how the Sun affects our planet! Learn about solar
            flares, magnetic storms, and the incredible science behind space weather.
          </Typography>

          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" pt={2}>
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
        </Container>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Box
            display="grid"
            gap={3}
            sx={{ gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" } }}
          >
            {/* Flipbook Card */}
            <Card
              sx={{
                border: "2px solid rgba(255,152,0,0.3)",
                background: "rgba(20,20,30,0.8)",
                backdropFilter: "blur(6px)",
                transition: "all 0.3s",
                "&:hover": {
                  border: "2px solid rgba(255,152,0,0.6)",
                  transform: "scale(1.05)"
                }
              }}
            >
              <CardHeader
                title={
                  <Box textAlign="left">
                    <Box
                      sx={{
                        mb: 2,
                        width: 64,
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        background: "rgba(255,152,0,0.2)"
                      }}
                    >
                      <MenuBookIcon sx={{ fontSize: 32, color: "#ff9800" }} />
                    </Box>
                    <Typography variant="h5" color="white">
                      Interactive Flipbook
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">
                      Flip through beautiful pages and learn about solar weather phenomena in a fun,
                      engaging way!
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Button fullWidth sx={{ background: "#ff9800", "&:hover": { background: "#fb8c00" }, color: "white" }}>
                  Open Flipbook
                  <MenuBookIcon sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>

            {/* Games Card */}
            <Card
              sx={{
                border: "2px solid rgba(245,0,87,0.3)",
                background: "rgba(20,20,30,0.8)",
                backdropFilter: "blur(6px)",
                transition: "all 0.3s",
                "&:hover": {
                  border: "2px solid rgba(245,0,87,0.6)",
                  transform: "scale(1.05)"
                }
              }}
            >
              <CardHeader
                title={
                  <Box textAlign="left">
                    <Box
                      sx={{
                        mb: 2,
                        width: 64,
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        background: "rgba(245,0,87,0.2)"
                      }}
                    >
                      <SportsEsportsIcon sx={{ fontSize: 32, color: "#f50057" }} />
                    </Box>
                    <Typography variant="h5" color="white">
                      Space Weather Games
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">
                      Play exciting games and test your knowledge about solar storms, auroras, and
                      space science!
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Button
                  fullWidth
                  sx={{
                    background: "#f50057",
                    "&:hover": { background: "#c51162" },
                    color: "white"
                  }}
                >
                  Play Games
                  <SportsEsportsIcon sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>

            {/* Quiz Card */}
            <Card
              sx={{
                border: "2px solid rgba(41,182,246,0.3)",
                background: "rgba(20,20,30,0.8)",
                backdropFilter: "blur(6px)",
                transition: "all 0.3s",
                "&:hover": {
                  border: "2px solid rgba(41,182,246,0.6)",
                  transform: "scale(1.05)"
                }
              }}
            >
              <CardHeader
                title={
                  <Box textAlign="left">
                    <Box
                      sx={{
                        mb: 2,
                        width: 64,
                        height: 64,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        background: "rgba(41,182,246,0.2)"
                      }}
                    >
                      <FlashOnIcon sx={{ fontSize: 32, color: "#29b6f6" }} />
                    </Box>
                    <Typography variant="h5" color="white">
                      Solar Storm Quiz
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">
                      Challenge yourself with fun quizzes and become a solar weather expert!
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Button
                  fullWidth
                  sx={{
                    background: "#29b6f6",
                    "&:hover": { background: "#039be5" },
                    color: "white"
                  }}
                >
                  Take Quiz
                  <FlashOnIcon sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>

        {/* Info Section */}
        <Container maxWidth="md" sx={{ py: 12 }}>
          <Card sx={{ border: "2px solid rgba(255,152,0,0.3)", background: "rgba(20,20,30,0.8)", backdropFilter: "blur(6px)" }}>
            <CardHeader
              title={
                <Box textAlign="center">
                  <Typography variant="h4" color="white" mb={1}>
                    What is Solar Weather?
                  </Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.7)">
                    Solar weather refers to the changing conditions on the Sun and in space that can
                    affect Earth!
                  </Typography>
                </Box>
              }
            />
            <CardContent>
              <Box
                display="grid"
                gap={3}
                sx={{ gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, textAlign: "center" }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: 64,
                      height: 64,
                      mx: "auto",
                      borderRadius: "50%",
                      background: "rgba(255,152,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <WbSunnyIcon sx={{ fontSize: 32, color: "#ff9800" }} />
                  </Box>
                  <Typography variant="h6" color="white">
                    Solar Flares
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Massive explosions on the Sun that release huge amounts of energy!
                  </Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: 64,
                      height: 64,
                      mx: "auto",
                      borderRadius: "50%",
                      background: "rgba(245,0,87,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: 32, color: "#f50057" }} />
                  </Box>
                  <Typography variant="h6" color="white">
                    Magnetic Storms
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Disturbances in Earth's magnetic field caused by solar wind!
                  </Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: 64,
                      height: 64,
                      mx: "auto",
                      borderRadius: "50%",
                      background: "rgba(41,182,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FlashOnIcon sx={{ fontSize: 32, color: "#29b6f6" }} />
                  </Box>
                  <Typography variant="h6" color="white">
                    Auroras
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.7)">
                    Beautiful light shows in the sky created by solar particles!
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Container>

        {/* Footer */}
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
            <RocketIcon sx={{ color: "#ff9800" }} />
            <Typography variant="h6" fontWeight="600" color="white">
              Solar Weather Explorer
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            A NASA Space Apps Challenge 2025 Project
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Made with ❤️ for curious minds everywhere
          </Typography>
        </Box>
      </Box>

      {/* Animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        body {
          background: linear-gradient(180deg, rgb(10, 15, 35) 0%, rgb(25, 15, 45) 50%, rgb(15, 10, 30) 100%);
          min-height: 100vh;
        }
      `}</style>
    </Box>
    </>
  )
}
