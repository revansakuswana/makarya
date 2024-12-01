import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
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
  const [imageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
    const fetchArticle = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/articleslist/${id}`,
          { withCredentials: true }
        );
        setArticle(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchArticle();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleQuillChange = (value) => {
    setArticle({
      ...article,
      content: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setError("File size should not exceed 5MB.");
        return;
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
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
      if (response.status === 200 || response.data.success) {
        setAlertSeverity("success");
        setAlertMessage("Artikel berhasil diperbarui.");
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/articleslist");
        }, 1000);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.field] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        setError(err.message); // Set error message for other errors
        setAlertMessage("Gagal memperbarui artikel. Silakan coba lagi.");
      }
      setAlertSeverity("error");
      setAlertOpen(true);
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
            {error && (
              <Grid xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <form onSubmit={handleSubmit}>
              <Grid mb={3}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={article.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid mb={3}>
                <TextField
                  label="Category"
                  name="category"
                  fullWidth
                  value={article.category}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {previewImage ? (
                <Grid>
                  <Typography mb={1}>New Image:</Typography>
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
                    <Typography mb={1}>Current Image:</Typography>
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/api/public/images/${article.image}`}
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
                    sx={{ marginY: 2 }}
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

              <Grid mb={3}>
                <ReactQuill
                  value={article.content}
                  onChange={handleQuillChange}
                  modules={quillModules}
                  required
                />
              </Grid>

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
            </form>
          </Grid>
        )}
        {/* ====== ALERT ====== */}
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

export default ArticleEdit;
