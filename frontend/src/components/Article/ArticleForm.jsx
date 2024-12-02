import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Input,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import getBlogTheme from "./theme/getBlogTheme";
import Loaders from "../Loaders/Loaders";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
    setContent(value);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async () => {
    let validationErrors = {}; // Tempat menyimpan kesalahan

    // Validasi untuk setiap field
    if (!title) {
      validationErrors.title = "Silakan isi judul artikel.";
    }
    if (!category) {
      validationErrors.category = "Silakan isi kategori artikel.";
    }
    if (!image) {
      validationErrors.image = "Silakan unggah gambar artikel.";
    }
    if (!content) {
      validationErrors.content = "Silakan isi konten artikel.";
    }

    // Jika ada kesalahan, set state dan return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("content", content);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/articles/articlesform`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201 || response.data.success) {
        setAlertSeverity("success");
        setAlertMessage("Artikel berhasil diposting.");
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/articles");
        }, 1000);
        setTitle("");
        setCategory("");
        setContent("");
        setImage(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.field] = error.message;
        });
        setError(formattedErrors);
      } else {
        setAlertMessage("Gagal memposting artikel. Silakan coba lagi.");
      }
      setAlertSeverity("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setImage(null);
    setAlertOpen(false);
    navigate(-1);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image/")) {
      if (file.size > 3 * 1024 * 1024) {
        setAlertMessage("The image file is too large. Maximum size is 3MB.");
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setAlertMessage("Please upload a valid image file.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
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
              Posting Artikel
            </Typography>

            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={handleInputChange(setTitle)}
              error={!!errors.title}
              helperText={errors.title}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={handleInputChange(setCategory)}
              error={!!errors.category}
              helperText={errors.category}
              variant="outlined"
            />

            {previewImage && (
              <Grid>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: 200,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </Grid>
            )}

            {/* Input Gambar terpisah dengan Button dan Input */}
            <Grid container spacing={2} alignItems="center" sx={{ my: 2 }}>
              <Grid>
                <Button variant="contained" component="label" color="secondary">
                  Upload Image
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    error={!!errors.image}
                    sx={{ display: "none" }}
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
                value={content}
                onChange={handleContentChange}
                modules={quillModules}
                theme="snow"
                style={{ height: "300px", marginBottom: "50px" }}
              />
              {errors.content && (
                <FormHelperText error>{errors.content}</FormHelperText>
              )}
            </Grid>

            <Grid container spacing={2} sx={{ mt: { xs: 10, sm: 7 } }}>
              <Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  disabled={loading}>
                  Submit
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
          </Grid>
        )}

        {/* ====== ALERT ====== */}
        <ThemeProvider theme={defaultTheme}>
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
        </ThemeProvider>
      </Container>
    </ThemeProvider>
  );
};

export default ArticleForm;
