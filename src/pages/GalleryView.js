import React from 'react'
import { useNavigate } from "react-router-dom";
import SpaceBackground from '../components/SpaceBackground';

import { Typography, Button, Container, Box } from "@mui/material"; import RocketIcon from "@mui/icons-material/Rocket"; import { UserContext } from "../context/UserContext"; // adjust path if needed
import MenuBook from "@mui/icons-material/MenuBook";
import SportsEsports from "@mui/icons-material/SportsEsports";
import FlashOn from "@mui/icons-material/FlashOn";
import Security from "@mui/icons-material/Security";
import {Card,CardHeader, CardContent} from '@mui/material';
import WbSunny from "@mui/icons-material/WbSunny";
import LibraryBooks from "@mui/icons-material/LibraryBooks";

function GalleryView() {
      const navigate = useNavigate();

  return (
    <>
          <SpaceBackground />


      <Box sx={{ position: "relative", zIndex: 10 }}>
        
 {/* <Container maxWidth="md" sx={{ py: 12 }}>
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
                    <WbSunny sx={{ fontSize: 32, color: "#ff9800" }} />
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
                    <Security sx={{ fontSize: 32, color: "#f50057" }} />
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
                    <FlashOn sx={{ fontSize: 32, color: "#29b6f6" }} />
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
        </Container> */}
       
        <Container maxWidth="lg" sx={{ py: 12 }}>
          <Box
            display="grid"
            gap={3}
            sx={{ gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr" } }}
          >
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
                      <MenuBook sx={{ fontSize: 32, color: "#ff9800" }} />
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
                <Button fullWidth sx={{ background: "#ff9800", "&:hover": { background: "#fb8c00" }, color: "white" }} onClick={()=>navigate('/ReadBook')}>
                  Open Flipbook
                  <MenuBook sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>

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
                      <SportsEsports sx={{ fontSize: 32, color: "#f50057" }} />
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
                  onClick={()=>navigate('/ImpactGames')}
                >
                  Play Games
                  <SportsEsports sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>

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
                      <FlashOn sx={{ fontSize: 32, color: "#29b6f6" }} />
                    </Box>
                    <Typography variant="h5" color="white">
                      Solar Storm Quiz
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">
                    Challenge yourself with this fun interactive quiz and become an ultimate solar weather expert!
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
                  onClick={()=>navigate('/Quiz')}
                >
                  Take Quiz
                  <FlashOn sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>

            <Card
              sx={{
                border: "2px solid rgba(41, 246, 45, 0.3)",
                background: "rgba(20,20,30,0.8)",
                backdropFilter: "blur(6px)",
                transition: "all 0.3s",
                "&:hover": {
                  border: "2px solid rgba(41, 246, 45, 0.3)",
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
                        background: "rgba(41, 246, 45, 0.2)"
                      }}
                    >
                      <LibraryBooks sx={{ fontSize: 32, color: "rgba(41, 246, 45, 1)" }} />
                    </Box>
                    <Typography variant="h5" color="white">
                      Glossary
                    </Typography>
                    <Typography variant="body1" color="rgba(255,255,255,0.7)">
Explore key terms and concepts and visualize them to master the language of solar weather!                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Button
                  fullWidth
                  sx={{
                    background: "rgba(41, 246, 45, 1)",
                    "&:hover": { background: "#039be5" },
                    color: "white"
                  }}
                  onClick={()=>navigate('/Glossary')}
                >
                  Start Learning!
                  <LibraryBooks sx={{ ml: 1 }} />
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>

       

</Box> 
       
       
        </>

  )
}

export default GalleryView




