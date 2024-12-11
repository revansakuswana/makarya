import { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const Bookmark = ({ jobsId }) => {
  const defaultTheme = createTheme();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/session`,
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    const fetchBookmarkStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/saved-jobs`,
          { withCredentials: true }
        );
        const savedJobs = response.data.data;
        const isJobBookmarked = savedJobs.some(
          (job) => String(job.id) === String(jobsId)
        );
        setIsBookmarked(isJobBookmarked);
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage(error.response?.data?.msg);
      }
    };

    if (isLoggedIn) fetchBookmarkStatus();
  }, [jobsId, isLoggedIn]);

  const toggleBookmark = async () => {
    if (!isLoggedIn) {
      navigate("/users/signin");
      return;
    }
    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/delete-job`,
          {
            data: { id: jobsId },
            withCredentials: true,
          }
        );
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
        setAlertOpen(true);
      } else {
        // Add bookmark
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/save-job`,
          { id: jobsId },
          { withCredentials: true }
        );
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
        setAlertOpen(true);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.response?.data?.msg);
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Box>
      <Box
        className="bookmark"
        onClick={toggleBookmark}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        {isBookmarked ? (
          <BookmarkIconSolid
            style={{
              color: "black",
              width: "30px",
              height: "30px",
            }}
          />
        ) : (
          <BookmarkIconOutline
            style={{
              color: "black",
              width: "30px",
              height: "30px",
            }}
          />
        )}
      </Box>
      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          open={alertOpen}
          autoHideDuration={1500}
          onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            severity={alertSeverity}
            sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </Box>
  );
};

Bookmark.propTypes = {
  jobsId: PropTypes.string.isRequired,
};

export default Bookmark;
