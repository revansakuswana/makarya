import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import { styled } from "@mui/material/styles";
import { marked } from "marked";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import getBlogTheme from "../theme/getBlogTheme";
import Loaders from "../../Loaders/Loaders";
import axios from "axios";

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

const getTimeAgo = (updatedAt) => {
  const now = new Date();
  const updatedDate = parseISO(updatedAt);

  const days = Math.abs(differenceInDays(now, updatedDate));
  if (days > 0) {
    return `${days} hari yang lalu`;
  }

  const hours = Math.abs(differenceInHours(now, updatedDate));
  if (hours > 0) {
    return `${hours} jam yang lalu`;
  }

  const minutes = Math.abs(differenceInMinutes(now, updatedDate));
  if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  }

  const seconds = Math.abs(differenceInSeconds(now, updatedDate));
  return `${seconds} detik yang lalu`;
};

export default function Latest() {
  const defaultTheme = createTheme();
  const blogTheme = createTheme(getBlogTheme("light"));

  const [articles, setArticles] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [articlesPerPage] = React.useState(6);

  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const { id } = useParams();

  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/allarticles`
        );
        const sortedArticles = response.data.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setArticles(sortedArticles);
      } catch (err) {
        setAlertMessage(err.response.data.msg);
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchArticles();
  }, [id]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const getExcerpt = (content, maxLength = 150) => {
    const htmlContent = marked(content);
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText.length <= maxLength
      ? plainText
      : plainText.slice(0, maxLength) + "...";
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={blogTheme}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Typography variant="h2">Artikel Terbaru</Typography>
        {loading ? (
          <div className="flex justify-center items-center h-full my-72">
            <Loaders size={70} />
          </div>
        ) : (
          <Grid container spacing={6} columns={12}>
            {currentArticles.map((article) => (
              <Grid key={article} size={{ xs: 12, sm: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1,
                  }}>
                  <Typography gutterBottom variant="caption" component="div">
                    {article.category}
                  </Typography>
                  <TitleTypography
                    variant="h6"
                    component="a"
                    href={`/articles/${article.id}`}
                    style={{ textDecoration: "none" }}>
                    {article.title}
                    <NavigateNextRoundedIcon
                      className="arrow"
                      sx={{ fontSize: "1rem" }}
                    />
                  </TitleTypography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom>
                    {getExcerpt(article.content, 150)}
                  </StyledTypography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                      }}>
                      <Avatar
                        src={`${import.meta.env.VITE_BASE_URL}/public/images/${
                          article.author.avatar
                        }`}
                        alt={article.author.name}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="caption">
                        {article.author.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption">
                      {getTimeAgo(article.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={2000}
            onClose={handleCloseAlert}>
            <Alert
              onClose={handleCloseAlert}
              severity={alertSeverity}
              sx={{ width: "100%" }}>
              {alertMessage}
            </Alert>
          </Snackbar>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </ThemeProvider>
      </Box>
    </ThemeProvider>
  );
}
