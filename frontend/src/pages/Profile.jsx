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
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [initialUserData, setInitialUserData] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState(null);
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
        if (userData.avatar) {
          const imageResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/public/images/${userData.avatar}`,
            { responseType: "blob" }
          );
          setAvatarBlob(URL.createObjectURL(imageResponse.data));
        }
      } catch (err) {
        setAlertSeverity("error");
        setAlertMessage(err?.response?.data?.msg);
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarBlob) {
        URL.revokeObjectURL(avatarBlob);
      }
    };
  }, [avatarBlob]);

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
            `${import.meta.env.VITE_BASE_URL}/public/images/${
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
        setAlertSeverity("error");
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
      if (file.size > 3000000) {
        setAlertSeverity("error");
        setAlertMessage("Ukuran file tidak boleh melebihi 3MB");
        setAlertOpen(true);
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
      setAlertSeverity("success");
      setAlertMessage(response?.data?.msg);
      setAlertOpen(true);
    } catch (error) {
      const statusCode = error.response?.status;
      setAlertSeverity("error");
      if (statusCode === 404) {
        setAlertMessage(statusCode);
      } else if (statusCode === 500) {
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
              gap: 5,
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
                gap: 2,
                minWidth: { xs: "100%", md: 400 },
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
                    src={previewImage || avatarBlob}
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
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
                <Typography variant="h5" fontWeight="bold">
                  {users.name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "left",
                    }}>
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
                    <Box>
                      {users.is_verified ? (
                        <CheckBadgeIcon
                          style={{
                            height: 20,
                            width: 20,
                            color: "#016FDD",
                          }}
                        />
                      ) : (
                        <ExclamationCircleIcon
                          style={{
                            height: 24,
                            width: 24,
                            color: "red",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  {!users.is_verified && (
                    <Link
                      sx={{
                        fontSize: 10,
                        marginLeft: 4,
                        color: "red",
                      }}
                      onClick={handleVerify}>
                      Kirim email verifikasi
                    </Link>
                  )}
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1, justifyContent: "left" }}
                  spacing={1}>
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
                    className="mr-1"
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
                    className="mr-1"
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
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    autoComplete="name"
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
                    autoComplete="email"
                    value={users.email}
                    onChange={handleInputChange}
                  />

                  {/* Tombol Simpan dan Batal */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={handleSubmit}>
                      Simpan
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleCancel}>
                      Batalkan
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 2.2,
                  }}>
                  <Box xs={12} sm={6}>
                    <Typography variant="h6" fontWeight="bold">
                      Nama
                    </Typography>
                    <Typography variant="body1">{users.name}</Typography>
                  </Box>
                  <Box xs={12} sm={6}>
                    <Typography variant="h6" fontWeight="bold">
                      Lokasi
                    </Typography>
                    <Typography variant="body1">{users.location}</Typography>
                  </Box>
                  <Box xs={12} sm={6}>
                    <Typography variant="h6" fontWeight="bold">
                      Pendidikan Terakhir
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
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={handleEditToggle}>
                      <PencilSquareIcon
                        style={{
                          height: 20,
                          width: 20,
                          marginRight: 5,
                        }}
                      />
                      Ubah
                    </Button>
                  </Box>
                </Box>
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
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="contained"
            size="small"
            color="secondary">
            Batalkan
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            size="small"
            color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <ThemeProvider theme={defaultTheme}>
        <Snackbar
          open={alertOpen}
          autoHideDuration={2000}
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
