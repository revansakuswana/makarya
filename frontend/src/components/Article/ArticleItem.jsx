import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
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
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";
import getBlogTheme from "./theme/getBlogTheme.jsx";
import Loaders from "../Loaders/Loaders.jsx";
import DOMPurify from "dompurify";
import { marked } from "marked";

const ArticleItem = () => {
  const defaultTheme = createTheme();
  const [mode] = useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [article, setArticle] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const getTimeAgo = (updatedAt) => {
    if (!updatedAt) return "Unknown time";
    const now = new Date();

    let updatedDate;
    try {
      updatedDate = parseISO(updatedAt);
    } catch (error) {
      return "Invalid date";
    }

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

  const truncateContent = (content, maxLength) => {
    if (!content) return "Loading content...";
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/allarticles/${id}`
        );
        setArticle(response.data.data);
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
    fetchArticle();
  }, [id]);

  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    const fetchArticlesList = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/allarticles`);
        setArticlesList(response.data.data);
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
    fetchArticlesList();
  }, [id]);

  const [users, setUsers] = useState({
    image: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/profile`, {
          withCredentials: true,
        });
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

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: { xs: 15, md: 16 },
          gap: 4,
        }}>
        <Breadcrumb />
        {loading ? (
          <div className="flex justify-center items-center h-full my-72">
            <Loaders size={70} />
          </div>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
            }}>
            <Card
              sx={{
                width: { xs: "100%", md: 800 },
                mt: { xs: 0, md: 5 },
                padding: 0,
              }}>
              <CardMedia
                component="img"
                height="auto"
                src={`${import.meta.env.VITE_BASE_URL}/api/public/images/${article.image}`}
                alt="Article Cover"
              />

              <CardContent>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 3,
                  }}>
                  <Grid
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 1,
                      alignItems: "center",
                    }}>
                    <Box
                      sx={{
                        width: { xs: 150, md: 200 },
                        height: { xs: 40, md: 40 },
                        backgroundColor: "#EDEDED",
                        borderRadius: "50px",
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                      }}>
                      <Avatar
                        src={`${import.meta.env.VITE_BASE_URL}/api/public/images/${users.image}`}
                        sx={{
                          width: { xs: 30, md: 30 },
                          height: { xs: 30, md: 30 },
                          marginLeft: { xs: 0.8, md: 0.9 },
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ marginLeft: 1, fontSize: 15 }}>
                        {article.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        display: "flex",
                      }}>
                      <CalendarDaysIcon className="h-5 w-5 mr-2" />{" "}
                      {getTimeAgo(article.updatedAt)}
                    </Typography>
                  </Grid>

                  <Grid xs={12}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {article.category}
                    </Typography>
                  </Grid>

                  <Grid xs={12}>
                    <Typography variant="h4" component="div">
                      {article.title}
                    </Typography>
                  </Grid>

                  <Grid xs={12}>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      dangerouslySetInnerHTML={{
                        __html: article.content
                          ? DOMPurify.sanitize(marked(article.content))
                          : "Loading content...",
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ mt: { xs: 4, md: 0 }, width: { xs: "100%", md: 300 } }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1.6 }}>
                Artikel lainnya
              </Typography>
              {articlesList
                .filter((otherArticle) => otherArticle.id !== article.id)
                .slice(0, 3)
                .map((otherArticle) => (
                  <Card
                    key={otherArticle.id}
                    sx={{
                      width: "100%",
                      padding: 0,
                      mb: 2,
                    }}>
                    <Grid
                      component="a"
                      href={`/articles/${otherArticle.id}`}
                      style={{ textDecoration: "none" }}>
                      <Grid>
                        <CardMedia
                          component="img"
                          height="auto"
                          src={`${import.meta.env.VITE_BASE_URL}/api/public/images/${otherArticle.image}`}
                        />
                      </Grid>

                      <Grid
                        xs={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          padding: 2,
                        }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            display: "flex",
                          }}>
                          <CalendarDaysIcon className="h-5 w-5 mr-2" />{" "}
                          {getTimeAgo(otherArticle.updatedAt)}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {otherArticle.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              marked(truncateContent(otherArticle.content, 100))
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                ))}
            </Box>
          </Grid>
        )}

        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleCloseAlert}>
            <Alert
              onClose={handleCloseAlert}
              severity={alertSeverity}
              sx={{ width: "100%" }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Container>
    </ThemeProvider>
  );
};

export default ArticleItem;
