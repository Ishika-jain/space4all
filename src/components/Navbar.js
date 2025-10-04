import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, updateUser } = useContext(UserContext); // must be inside UserProvider

  const [anchorEl, setAnchorEl] = useState(null);
  const [tempName, setTempName] = useState(user.name);
  const [tempAge, setTempAge] = useState(user.age);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSave = () => {
    updateUser({ name: tempName, age: tempAge });
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: 600 }}
        >
          Here For You
        </Typography>

        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          sx={{ position: "absolute", right: 16 }}
        >
          <AccountCircle />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: { p: 2, width: 250 } }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Edit Profile
          </Typography>
          <TextField
            label="Name"
            fullWidth
            size="small"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Age"
            fullWidth
            size="small"
            type="number"
            value={tempAge}
            onChange={(e) => setTempAge(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleSave}>
            Save
          </Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
