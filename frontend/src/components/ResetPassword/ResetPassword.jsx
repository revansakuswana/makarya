import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Button,
  Typography,
  OutlinedInput,
  FormLabel,
  Box,
  Stack,
  Card,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getSignInTheme from "../SignIn/getSignInTheme";
import axios from "axios";

export default function ResetPassword() {
  const defaultTheme = createTheme();
  const SignInTheme = createTheme(getSignInTheme("light"));

  const [password, setPassword] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/reset-password/${token}`,
        { password }
      );
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage(response?.data?.msg);
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/users/signin");
        }, 2000);
      }
    } catch (error) {
      const statusCode = error.response?.status;
      setAlertSeverity("error");
      if (statusCode === 500) {
        setAlertMessage(error.response?.data?.msg);
      } else if (statusCode === 400) {
        setAlertMessage(error.response?.data?.msg);
      }
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <ThemeProvider theme={SignInTheme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          my: { xs: 25, sm: 30 },
          gap: 4,
        }}>
        <Box
          sx={{
            width: { xs: "100%", sm: "50%" },
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            gap: 2,
          }}>
          <Stack>
            <Card
              variant="outlined"
              component="form"
              onSubmit={handleSubmit}
              sx={{
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}>
              <Typography
                variant="h2"
                component="h1"
                align="center"
                gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body1" align="center">
                Masukkan kata sandi baru anda untuk mengatur ulang akun anda
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel htmlFor="email">Password</FormLabel>
                <OutlinedInput
                  autoFocus
                  required
                  label="New Password"
                  placeholder="New Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  sx={{
                    width: "100%",
                  }}
                  type="submit"
                  variant="contained"
                  color="secondary">
                  Reset
                </Button>
              </Box>
            </Card>
          </Stack>
        </Box>

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
}
