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
  BookmarkIcon,
  NewspaperIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AvatarIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [avatarBlob, setAvatarBlob] = useState(null);
  const [users, setUsers] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    education: "",
    skills: "",
    avatar: "",
  });

  const handleLogout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      navigate("/users/signin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            withCredentials: true,
          }
        );
        const userData = response.data.data;
        setUsers(userData);
        if (userData.avatar) {
          const imageResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/public/images/${userData.avatar}`,
            { responseType: "blob" }
          );
          setAvatarBlob(URL.createObjectURL(imageResponse.data));
        }
      } catch (err) {
        console.error(err?.response?.data?.msg);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarBlob) {
        URL.revokeObjectURL(avatarBlob);
      }
    };
  }, [avatarBlob]);

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
              src={avatarBlob}
              alt={users.name}
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
            src={avatarBlob}
            alt={users.name}
            sx={{ width: 120, height: 120, cursor: "pointer" }}
          />
          Profile
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          component="a"
          href="/savedjobs"
          style={{ textDecoration: "none" }}>
          <ListItemIcon>
            <BookmarkIcon className="h-5 w-5" />
          </ListItemIcon>
          Saved Jobs
        </MenuItem>

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
