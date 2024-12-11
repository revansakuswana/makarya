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
  Box,
} from "@mui/material";
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
  const [imageName, setImageName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleContentChange = (value) => {
    setContent(value);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!title) {
      validationErrors.title = "Silakan isi judul artikel";
    }
    if (!category) {
      validationErrors.category = "Silakan isi kategori artikel";
    }
    if (!image) {
      validationErrors.image = "Silakan unggah gambar artikel";
    }
    if (!content) {
      validationErrors.content = "Silakan isi konten artikel";
    }

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
      if (response.status === 201) {
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
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
      if (err.response.status === 400) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.field] = error.msg;
        });
        setErrors(formattedErrors);
      } else if (err.response.status === 500) {
        setAlertSeverity("error");
        setAlertMessage(err.response.data.msg);
        setAlertOpen(true);
      } else {
        setAlertSeverity("error");
        setAlertMessage(err.response.data.msg);
        setAlertOpen(true);
      }
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
          <Box sx={{ maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Posting Artikel
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Title
                </Typography>
                <TextField
                  label="Title"
                  value={title}
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleInputChange(setTitle)}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Category
                </Typography>
                <TextField
                  label="Category"
                  value={category}
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleInputChange(setCategory)}
                  error={!!errors.category}
                  helperText={errors.category}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Image
                </Typography>
                {previewImage && (
                  <Box>
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
                  </Box>
                )}

                <Box container spacing={2} alignItems="center">
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      component="label">
                      Unggah Gambar
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        error={!!errors.image}
                        sx={{ display: "none" }}
                      />
                    </Button>
                  </Box>
                  <Box>
                    <FormHelperText>
                      {imageName || "No file selected"}
                    </FormHelperText>
                    {errors.image && (
                      <FormHelperText error>{errors.image}</FormHelperText>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body" sx={{ fontWeight: "bold" }}>
                  Content
                </Typography>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  modules={quillModules}
                  required
                />
                {errors.content && (
                  <FormHelperText error>{errors.content}</FormHelperText>
                )}
              </Box>

              <Box container spacing={2}>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleSubmit}
                    disabled={loading}>
                    Posting
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleCancel}>
                    Batalkan
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* ====== ALERT ====== */}
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
        </ThemeProvider>
      </Container>
    </ThemeProvider>
  );
};

export default ArticleForm;
