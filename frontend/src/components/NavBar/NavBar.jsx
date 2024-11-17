import * as React from "react";
import {
  Typography,
  alpha,
  styled,
  createTheme,
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Drawer,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo header.svg";
import MenuIcon from "@mui/icons-material/Menu.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded.js";
import getBlogTheme from "../Article/theme/getBlogTheme.jsx";
import AvatarIcon from "../Avatar/Avatar.jsx";
import axios from "axios";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function NavBar() {
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const getSessionLogin = async () => {
    try {
      const cookies = document.cookie;
      let jwt;
      const jwtToken = cookies.split("jwt=");
      if (jwtToken.length === 2) {
        jwt = jwtToken[1].split(";")[0];
      }

      if (!jwt) {
        setIsLoggedIn(false);
        return;
      } else setIsLoggedIn(true);
    } catch (error) {
      console.error("Error validating session", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/users/logout", {
        withCredentials: true,
      });
      //
      setIsLoggedIn(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        getSessionLogin();
      }
    };

    getSessionLogin();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [location]);

  return (
    <ThemeProvider theme={blogTheme}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 5,
        }}>
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 0,
              }}>
              <a href="/home">
                <img src={logo} alt="Logo" />
              </a>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 3,
                }}>
                <Typography
                  component="a"
                  href="/home"
                  variant="text"
                  color="primary">
                  Home
                </Typography>
                <Typography
                  component="a"
                  href="/jobs"
                  variant="text"
                  color="primary">
                  Find Jobs
                </Typography>
                <Typography
                  component="a"
                  href="/articles"
                  variant="text"
                  color="primary">
                  Article
                </Typography>
                <Typography
                  component="a"
                  href="/about"
                  variant="text"
                  color="primary">
                  About
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 1,
                  alignItems: "center",
                }}>
                {!isLoggedIn ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    href="/users/signin">
                    Sign in
                  </Button>
                ) : (
                  <>
                    <AvatarIcon handleLogout={handleLogout} />
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ display: { sm: "flex", md: "none" } }}>
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                    }}>
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: {
                        xs: "flex",
                        md: "flex",
                        flexDirection: "column",
                      },
                      alignItems: "left",
                      gap: 2,
                    }}>
                    <Typography
                      component="a"
                      href="/home"
                      variant="text"
                      color="primary"
                      sx={{ fontWeight: "Bold" }}>
                      Home
                    </Typography>
                    <Typography
                      component="a"
                      href="/jobs"
                      variant="text"
                      color="primary"
                      sx={{ fontWeight: "Bold" }}>
                      Find Jobs
                    </Typography>
                    <Typography
                      component="a"
                      href="/articles"
                      variant="text"
                      color="primary"
                      sx={{ fontWeight: "Bold" }}>
                      Article
                    </Typography>
                    <Typography
                      component="a"
                      href="/about"
                      variant="text"
                      color="primary"
                      sx={{ fontWeight: "Bold" }}>
                      About
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      marginY: 2,
                    }}
                  />
                  <MenuItem>
                    {!isLoggedIn ? (
                      <Button
                        href="/users/signin"
                        color="secondary"
                        variant="contained"
                        fullWidth>
                        Sign in
                      </Button>
                    ) : (
                      <>
                        <AvatarIcon handleLogout={handleLogout} />
                      </>
                    )}
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
