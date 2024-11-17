import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
  Snackbar,
  Input,
  FormHelperText,
} from "@mui/material";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import getBlogTheme from "../Article/theme/getBlogTheme";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import Loaders from "../Loaders/Loaders";
import axios from "axios";

const PostArticle = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // State for image input
  const [imageName, setImageName] = useState(""); // State to display the image name

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  // Quill editor modules for a full editor without image upload (handled separately)
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  // Handling form submission
  const handleSubmit = async () => {
    if (!title || !category || !content || image) {
      setAlertMessage("Please fill all required fields.");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);

    // Jika ada file gambar yang perlu di-upload
    if (image) {
      formData.append("image", image);
    }

    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User belum login, token tidak ada");
      }
      const response = await axios.post(
        "http://localhost:3000/postarticle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Sertakan token dalam header
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        setAlertSeverity("success");
        setAlertMessage("Artikel berhasil diposting.");
        setAlertOpen(true);
        setTitle("");
        setCategory("");
        setContent("");
        setImage(null); // Reset image after successful submission
        setImageName(""); // Reset image name
      }
    } catch (err) {
      setAlertMessage("Gagal memposting artikel. Silakan coba lagi.");
      setAlertSeverity("error");
      setAlertOpen(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // Cancel handler to clear the form
  const handleCancel = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setImage(null);
    setImageName("");
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImageName(file.name);
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
          <Box sx={{ maxWidth: "800px", margin: "auto" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Post an Article
            </Typography>

            <TextField
              fullWidth
              label="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Article Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            {/* Input Gambar terpisah dengan Button dan Input */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item>
                <Button variant="contained" component="label" color="primary">
                  Upload Image
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    sx={{ display: "none" }}
                  />
                </Button>
              </Grid>
              <Grid item>
                <FormHelperText>
                  {imageName || "No file selected"}
                </FormHelperText>
              </Grid>
            </Grid>

            <ReactQuill
              value={content}
              onChange={setContent}
              modules={quillModules}
              theme="snow"
              style={{ height: "300px", marginBottom: "50px" }}
            />

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}>
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
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

export default PostArticle;
