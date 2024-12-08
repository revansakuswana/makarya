import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  TextField,
  Button,
  Typography,
  Input,
  Alert,
  Snackbar,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import getBlogTheme from "./theme/getBlogTheme";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Loaders from "../Loaders/Loaders";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const ArticleEdit = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const [article, setArticle] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires returnValue to be set
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (value) => {
    setArticle((prevArticle) => ({ ...prevArticle, content: value }));
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/articleslist/${id}`,
          { withCredentials: true }
        );
        setArticle(response.data.data);
      } catch (err) {
        setErrors(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchArticle();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image/")) {
      if (file.size > 3 * 1024 * 1024) {
        setAlertMessage("Ukuran maksimum gambar adalah 3MB");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }
      setImage(file);
      setImageName(file.name);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setAlertMessage("Please upload a valid image file.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("category", article.category);
    formData.append("content", article.content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/articleslist/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/articleslist");
        }, 1000);
      }
    } catch (err) {
      if (err.response.status === 400) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.field] = error.mesg;
        });
        setErrors(formattedErrors);
        setAlertMessage(formattedErrors);
        console.log("Error:", formattedErrors);
      } else {
        setErrors(err.response.data.msg);
        setAlertSeverity("error");
        setAlertMessage(err.response.data.msg);
        setAlertOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}>
        <Breadcrumb />
        {loading ? (
          <div className="flex justify-center items-center h-full my-72">
            <Loaders size={70} />
          </div>
        ) : (
          <Grid sx={{ maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Edit Artikel
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Title
                </Typography>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={article.title}
                  onChange={handleInputChange((value) =>
                    setArticle((prevArticle) => ({
                      ...prevArticle,
                      title: value,
                    }))
                  )}
                  required
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Category
                </Typography>
                <TextField
                  label="Category"
                  name="category"
                  value={article.category}
                  onChange={handleInputChange((value) =>
                    setArticle((prevArticle) => ({
                      ...prevArticle,
                      category: value,
                    }))
                  )}
                  fullWidth
                  required
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Image
                </Typography>
                {previewImage ? (
                  <Grid>
                    <img
                      src={previewImage}
                      alt="New upload preview"
                      style={{
                        width: 200,
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </Grid>
                ) : (
                  article.image && (
                    <Grid>
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/public/images/${
                          article.image
                        }`}
                        alt="Current img cover"
                        style={{
                          width: 200,
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    </Grid>
                  )
                )}

                <Grid container spacing={2} alignItems="center">
                  <Grid>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      component="label">
                      Upload Image
                      <Input
                        type="file"
                        name="image"
                        sx={{ display: "none" }}
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </Button>
                  </Grid>
                  <Grid>
                    <FormHelperText>
                      {imageName || "No file selected"}
                    </FormHelperText>
                    {errors.image && (
                      <FormHelperText error>{errors.image}</FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Content
                </Typography>
                <ReactQuill
                  value={article.content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  required
                />
              </Box>

              <Grid
                container
                sx={{
                  display: "flex",
                  gap: 2,
                }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}>
                  Perbarui
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}>
                  Batalkan
                </Button>
              </Grid>
            </Box>
          </Grid>
        )}
        {/* ====== ALERT ====== */}
        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={3000}
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

export default ArticleEdit;
