import * as React from "react";
import {
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Menu,
} from "@mui/material";
import {
  // BookmarkIcon,
  NewspaperIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function AvatarIcon({ handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [previewImage, setPreviewImage] = useState(null);

  const [users, setUsers] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    education: "",
    skills: "",
    image: "",
  });

  const defaultImage =
    "https://banner2.cleanpng.com/20180420/krw/avfa3ii00.webp";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.data);
        setPreviewImage(
          response.data.data.image
            ? `${import.meta.env.VITE_BASE_URL}/public/images/${
                response.data.data.image
              }`
            : defaultImage
        );
      } catch (err) {
        err?.response?.data?.msg;
      }
    };

    fetchUsers();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            sx={{ borderRadius: "50%", border: "none" }}
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar
              src={
                previewImage ||
                `${import.meta.env.VITE_BASE_URL}/public/images/${
                  users.image
                }`
              }
              alt="Profile Picture"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem
          component="a"
          href="/profile"
          style={{ textDecoration: "none" }}>
          <Avatar
            src={previewImage || defaultImage}
            alt="Profile Picture"
            sx={{ width: 120, height: 120, cursor: "pointer" }}
          />
          Profile
        </MenuItem>

        {/* <MenuItem
          onClick={handleClose}
          component="a"
          href="/savedjobs"
          style={{ textDecoration: "none" }}>
          <ListItemIcon>
            <BookmarkIcon className="h-5 w-5" />
          </ListItemIcon>
          Saved Jobs
        </MenuItem> */}

        <MenuItem
          onClick={handleClose}
          component="a"
          href="/articleslist"
          style={{ textDecoration: "none" }}>
          <ListItemIcon>
            <NewspaperIcon className="h-5 w-5" />
          </ListItemIcon>
          My Article
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
