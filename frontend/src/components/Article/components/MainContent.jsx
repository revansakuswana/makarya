import React, { useState, useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import {
  styled,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { marked } from "marked";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import axios from "axios";
import Loaders from "../../Loaders/Loaders";

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

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

export function Search({ searchQuery, setSearchQuery }) {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        sx={{ flexGrow: 1 }}
      />
    </FormControl>
  );
}

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default function MainContent() {
  const [articles, setArticles] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] =
    React.useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = React.useState("");

  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/allarticles`
        );
        setArticles(response.data.data);
      } catch (err) {
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/allarticles`
        );
        setCategories(response.data.data);
      } catch (err) {
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchArticles();
    fetchCategories();
  }, []);

  const [users, setUsers] = useState({
    image: "",
  });

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
      } catch (err) {
        console.error(err?.response?.data?.msg);
      }
    };

    fetchUsers();
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "Semua Kategori" ||
      article.category === selectedCategory;
    const matchesSearchQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  const getExcerpt = (content, maxLength = 100) => {
    // Mengonversi Markdown ke HTML dan kemudian menggunakannya untuk mendapatkan excerpt
    const htmlContent = marked(content);
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); // Menghapus tag HTML
    return plainText.length <= maxLength
      ? plainText
      : plainText.slice(0, maxLength) + "...";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          sx={{ marginBottom: 0, fontSize: { xs: 23, md: 40 } }}
          variant="h2"
          gutterBottom>
          Rekomendasi Artikel
        </Typography>

        <Button
          sx={{ fontWeight: "bold", fontSize: { xs: 13, md: 15 } }}
          color="secondary"
          variant="contained"
          size="small"
          href="/articles/articlesform">
          <PencilSquareIcon
            style={{
              height: 20,
              width: 20,
              marginRight: 5,
            }}
          />
          Buat Artikel
        </Button>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
        }}>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}>
          <Chip
            onClick={() => handleClick("Semua Kategori")}
            size="medium"
            label="Semua Kategori"
            color={
              selectedCategory === "Semua Kategori" ? "primary" : "default"
            }
            variant={
              selectedCategory === "Semua Kategori" ? "contained" : "outlined"
            }
            sx={{
              backgroundColor:
                selectedCategory === "Semua Kategori"
                  ? "primary.main"
                  : "transparent",
              color:
                selectedCategory === "Semua Kategori"
                  ? "white"
                  : "text.primary",
              "&:hover": {
                backgroundColor:
                  selectedCategory === "Semua Kategori"
                    ? "primary.dark"
                    : "grey.300",
              },
            }}
          />
          {categories.map((category) => (
            <Chip
              key={category.id}
              onClick={() => handleClick(category.category)}
              size="medium"
              label={category.category}
              color={
                selectedCategory === category.category ? "primary" : "default"
              }
              variant={
                selectedCategory === category.category
                  ? "contained"
                  : "outlined"
              }
              sx={{
                backgroundColor:
                  selectedCategory === category.category
                    ? "primary.main"
                    : "transparent",
                color:
                  selectedCategory === category.category
                    ? "white"
                    : "text.primary",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === category.category
                      ? "primary.dark"
                      : "grey.300",
                },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>
      </Box>
      {loading ? (
        <div className="flex justify-center items-center h-full my-72">
          <Loaders size={70} />
        </div>
      ) : (
        <Grid container spacing={2} columns={12}>
          {filteredArticles.map((article) => (
            <Grid key={article.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SyledCard tabIndex={0}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${import.meta.env.VITE_BASE_URL}/public/images/${
                    articles.image
                  }`}
                  alt="image cover"
                />
                <SyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {articles.category}
                  </Typography>

                  <StyledTypography
                    variant="h5"
                    component="a"
                    href={`/articles/${articles.id}`}
                    style={{ textDecoration: "none" }}>
                    {articles.title}
                  </StyledTypography>
                  <Typography variant="body2" sx={{ pt: 2 }}>
                    {getExcerpt(articles.content, 100)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: "16px",
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                      }}>
                      <Avatar
                        key={article.id}
                        src={`${import.meta.env.VITE_BASE_URL}/public/images/${
                          users.image
                        }`}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="caption">{articles.name}</Typography>
                    </Box>
                    <Typography variant="caption">
                      {getTimeAgo(articles.updatedAt)}
                    </Typography>
                  </Box>
                </SyledCardContent>
              </SyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
