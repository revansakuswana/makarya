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
  Card,
  Alert,
  Snackbar,
  Stack,
} from "@mui/material";
import { useState } from "react";
import getSignInTheme from "../SignIn/getSignInTheme";
import axios from "axios";

export default function ForgotPassword() {
  const defaultTheme = createTheme();
  const SignInTheme = createTheme(getSignInTheme("light"));

  const [email, setEmail] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://makarya.my.id/api/forgot-password`,
        {
          email,
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
              <Typography variant="h2" align="center" gutterBottom>
                Forgot Password
              </Typography>
              <Typography variant="body1" align="center">
                Masukkan alamat email akun anda dan kami akan mengirimkan tautan
                untuk mengatur ulang kata sandi nda
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <OutlinedInput
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email address"
                  placeholder="Email address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Kirim
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
