import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Alert,
  Snackbar,
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  EnvelopeIcon,
  ArrowRightStartOnRectangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import Grid from "@mui/material/Grid2";
import getBlogTheme from "../components/Article/theme/getBlogTheme";
import Loaders from "../components/Loaders/Loaders";
import axios from "axios";

const Profile = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [setErrors] = useState({});
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [users, setUsers] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    education: "",
    skills: "",
    image: "",
    isVerified: "",
  });

  const defaultImage =
    "https://banner2.cleanpng.com/20180420/krw/avfa3ii00.webp";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/profile`, {
          withCredentials: true,
        });
        setUsers(response.data.data);
        setPreviewImage(
          response.data.data.image
            ? `http://localhost:3000/public/images/${response.data.data.image}`
            : defaultImage
        );
      } catch (err) {
        setAlertMessage(
          err?.response?.data?.msg || "Failed to fetch user data."
        );
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", users.name);
    formData.append("email", users.email);
    formData.append("location", users.location);
    formData.append("education", users.education);
    formData.append("skills", users.skills);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/profile/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.data.success) {
        setAlertSeverity("success");
        setAlertMessage(response?.data?.msg);
        setAlertOpen(true);
        if (response.data.data.image) {
          const updatedUser = response.data.data;
          setUsers((prev) => ({
            ...prev,
            image: updatedUser.image || prev.image,
          }));

          setPreviewImage(
            updatedUser.image
              ? `http://localhost:3000/public/images/${updatedUser.image}`
              : defaultImage
          );
        }
        setIsEditing(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.field] = error.msg;
        });
        setErrors(formattedErrors);
      } else {
        setError(err.msg);
        setAlertMessage(err.response?.data?.msg);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
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

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:3000/users/logout", {
        withCredentials: true,
      });
      navigate("/users/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/profile/`, {
        withCredentials: true,
      });
      setAlertSeverity("success");
      setAlertMessage(response.data.msg);
      setAlertOpen(true);
      await handleLogout();
      setTimeout(() => {
        navigate("/users/signin");
      }, 500);
    } catch (err) {
      const errorMessage = err.response?.data?.msg;
      setAlertSeverity("error");
      setAlertMessage(errorMessage);
      setAlertOpen(true);
    } finally {
      setAlertOpen(true);
      setDeleteConfirmOpen(false);
      setTimeout(() => {
        setAlertOpen(false);
      }, 1500);
    }
  };

  const handleOpenDeleteDialog = () => {
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteConfirmOpen(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/verify-email", {
        email: users.email,
      });
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage(response?.data?.msg);
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
        }, 2000);
      }
    } catch (error) {
      const statusCode = error.response?.status;
      setAlertSeverity("error");
      if (statusCode === 500) {
        setAlertMessage(error.response?.data?.msg);
      } else if (statusCode === 404) {
        setAlertMessage(error.response?.data?.msg);
      }
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  };

  return (
    <>
      <ThemeProvider theme={blogTheme}>
        <CssBaseline enableColorScheme />
        <Container
          maxWidth="lg"
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            my: { xs: 16, md: 23 },
            gap: 4,
            justifyContent: "space-between",
          }}>
          {loading ? (
            <div className="flex justify-center items-center h-full my-72">
              <Loaders size={70} />
            </div>
          ) : (
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: 4,
              }}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "left",
                  gap: 2,
                  width: { xs: "100%", md: 400 },
                }}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}>
                  <label htmlFor="avatar-upload">
                    <Avatar
                      src={previewImage || defaultImage}
                      alt="Profile Picture"
                      sx={{ width: 180, height: 180, cursor: "pointer" }}
                    />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    {users.name}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    gap: 2.2,
                  }}>
                  <Grid
                    container
                    spacing={1}
                    sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid sx={{ display: "flex", gap: 1 }}>
                      <EnvelopeIcon
                        style={{
                          height: 24,
                          width: 24,
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          fontSize: { xs: 13, md: 15 },
                        }}
                        variant="body1">
                        {users.email}
                      </Typography>
                      {(users.isVerified === 1 || users.isVerified === "1") && (
                        <CheckBadgeIcon
                          style={{
                            height: 20,
                            width: 20,
                            alignSelf: "center",
                            color: "#016FDD",
                          }}
                        />
                      )}
                    </Grid>

                    {!(users.isVerified === 1 || users.isVerified === "1") && (
                      <Grid sx={{ display: "flex" }}>
                        <ExclamationCircleIcon
                          style={{
                            height: 20,
                            width: 20,
                            alignSelf: "center",
                            marginRight: 4,
                            color: "#e50000",
                          }}
                        />
                        <Link onClick={handleVerify}>Verifikasi email</Link>
                      </Grid>
                    )}
                  </Grid>

                  <Grid container spacing={1} alignItems="left">
                    <Grid>
                      <MapPinIcon
                        style={{
                          height: 24,
                          width: 24,
                        }}
                      />
                    </Grid>
                    <Grid>
                      <Typography
                        sx={{
                          fontWeight: "medium",
                          fontSize: { xs: 13, md: 15 },
                        }}
                        variant="body1">
                        {users.location}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Tombol Edit, Logout, dan Hapus Akun */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 2,
                  }}>
                  <Button
                    sx={{ fontWeight: "bold", fontSize: { xs: 13, md: 15 } }}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleLogout}>
                    <ArrowRightStartOnRectangleIcon
                      style={{
                        height: 20,
                        width: 20,
                      }}
                      className="mr-2"
                    />
                    Logout
                  </Button>

                  <Button
                    sx={{ fontWeight: "bold", fontSize: { xs: 13, md: 15 } }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleOpenDeleteDialog}>
                    <TrashIcon
                      style={{
                        height: 20,
                        width: 20,
                      }}
                      className="mr-2"
                    />
                    Delete Account
                  </Button>
                </Box>
              </Grid>

              {/* Form Edit */}
              <Box
                component="form"
                sx={{
                  width: { xs: "100%", md: 800 },
                }}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Name"
                      name="name"
                      value={users.name}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Location"
                      name="location"
                      value={users.location}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Education"
                      name="education"
                      value={users.education}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Skills"
                      name="skills"
                      multiline
                      value={users.skills}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      name="email"
                      value={users.email}
                      onChange={handleInputChange}
                    />

                    {/* Tombol Simpan dan Batal */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 1.8,
                      }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleSubmit}>
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2.2,
                      }}>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                          Name
                        </Typography>
                        <Typography variant="body1">{users.name}</Typography>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                          Location
                        </Typography>
                        <Typography variant="body1">
                          {users.location}
                        </Typography>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                          Education
                        </Typography>
                        <Typography variant="body1">
                          {users.education}
                        </Typography>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                          Skills
                        </Typography>
                        <Typography variant="body1">{users.skills}</Typography>
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                          Email
                        </Typography>
                        <Typography variant="body1">{users.email}</Typography>
                      </Grid>
                    </Grid>
                    <Button
                      sx={{
                        marginTop: 1.8,
                      }}
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={handleEditToggle}>
                      Edit
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          )}
        </Container>

        <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteDialog}>
          <Grid sx={{ textAlign: "center" }}>
            <DialogTitle variant="h4">Konfirmasi</DialogTitle>
            <DialogContent>
              <Typography>
                Apakah anda yakin ingin menghapus akun anda?
              </Typography>
            </DialogContent>
          </Grid>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="contained"
              size="small"
              color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="contained"
              size="small"
              color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default Profile;
