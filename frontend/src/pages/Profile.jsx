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
  const [avatar, setAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [initialUserData, setInitialUserData] = useState(null);
  const [users, setUsers] = useState({
    id: "",
    name: "",
    email: "",
    location: "",
    education: "",
    skills: "",
    avatar: "",
    is_verified: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            withCredentials: true,
          }
        );
        const userData = response.data.data;
        setUsers(userData);
        setInitialUserData(userData);
        setPreviewImage(
          `${import.meta.env.VITE_BASE_URL}/public/images/${
            response.data.data.avatar
          }`
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
    if (avatar) {
      formData.append("avatar", avatar);
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/profile/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage(response.data.msg);
        setAlertOpen(true);
        const updatedUser = response.data.data;
        setUsers(updatedUser);
        setInitialUserData(updatedUser);
        if (response.data.data.avatar) {
          const updatedUser = response.data.data;
          setUsers((prev) => ({
            ...prev,
            avatar: updatedUser.avatar || prev.avatar,
          }));

          setPreviewImage(
            updatedUser.avatar`${import.meta.env.VITE_BASE_URL}/public/images/${
              updatedUser.avatar
            }`
          );
        }
        setIsEditing(false);
      }
    } catch (err) {
      if (err.response.status === 400) {
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
      setAvatar(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    if (initialUserData) {
      setUsers(initialUserData);
      setPreviewImage(
        `${import.meta.env.VITE_BASE_URL}/public/images/${
          initialUserData.avatar
        }`
      );
    }
    setAvatar(null);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      navigate("/users/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/profile/`,
        {
          withCredentials: true,
        }
      );
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
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/verify-email`,
        {
          email: users.email,
        }
      );
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage(response?.data?.msg);
        setAlertOpen(true);
      }
    } catch (error) {
      const statusCode = error.response?.status;
      setAlertSeverity("error");
      if (statusCode === 500 || statusCode === 404) {
        setAlertMessage(error.response?.data?.msg);
      }
      setAlertOpen(true);
    }
    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
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
          my: { xs: 16, md: 23 },
          gap: 4,
          justifyContent: "space-between",
        }}>
        {loading ? (
          <div className="flex justify-center items-center h-full my-72">
            <Loaders size={70} />
          </div>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
                gap: 2,
                width: { xs: "100%", md: 400 },
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}>
                <label htmlFor="avatar-upload">
                  <Avatar
                    src={
                      previewImage ||
                      `${import.meta.env.VITE_BASE_URL}/public/images/${
                        users.avatar
                      }`
                    }
                    alt={users.name}
                    sx={{
                      width: 180,
                      height: 180,
                      cursor: isEditing ? "pointer" : "default",
                    }}
                  />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="avatar/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  disabled={!isEditing} // Disable saat tidak dalam mode edit
                />
                <Typography variant="h5" fontWeight="bold">
                  {users.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  gap: 2.2,
                }}>
                <Box
                
                  spacing={1}
                  sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                    {(users.is_verified == 1 || users.is_verified == "1") && (
                      <CheckBadgeIcon
                        style={{
                          height: 20,
                          width: 20,
                          alignSelf: "center",
                          color: "#016FDD",
                        }}
                      />
                    )}
                  </Box>

                  {!(users.is_verified == 1 || users.is_verified == "1") && (
                    <Box sx={{ display: "flex" }}>
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
                    </Box>
                  )}
                </Box>

                <Box spacing={1} alignItems="left">
                  <Box>
                    <MapPinIcon
                      style={{
                        height: 24,
                        width: 24,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "medium",
                        fontSize: { xs: 13, md: 15 },
                      }}
                      variant="body1">
                      {users.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>

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
            </Box>

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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 2.2,
                    }}>
                    <Box xs={12} sm={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Name
                      </Typography>
                      <Typography variant="body1">{users.name}</Typography>
                    </Box>
                    <Box xs={12} sm={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Location
                      </Typography>
                      <Typography variant="body1">{users.location}</Typography>
                    </Box>
                    <Box xs={12} sm={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Education
                      </Typography>
                      <Typography variant="body1">{users.education}</Typography>
                    </Box>
                    <Box xs={12} sm={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Skills
                      </Typography>
                      <Typography variant="body1">{users.skills}</Typography>
                    </Box>
                    <Box xs={12} sm={6}>
                      <Typography variant="h6" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body1">{users.email}</Typography>
                    </Box>
                  </Box>
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
          </Box>
        )}
      </Container>

      <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteDialog}>
        <Box sx={{ textAlign: "center" }}>
          <DialogTitle variant="h4">Konfirmasi</DialogTitle>
          <DialogContent>
            <Typography>
              Apakah anda yakin ingin menghapus akun anda?
            </Typography>
          </DialogContent>
        </Box>
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
          autoHideDuration={1500}
          onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default Profile;
