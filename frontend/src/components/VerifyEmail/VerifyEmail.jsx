import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import getSignInTheme from "../SignIn/getSignInTheme";
import axios from "axios";

function VerifyEmail() {
  const SignInTheme = createTheme(getSignInTheme("light"));

  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/verify-email/${encodeURIComponent(token)}`
        );
        setMessage(response.data.msg);
      } catch (error) {
        setMessage(
          error.response?.data?.msg || "An unexpected error occurred."
        );
      } finally {
        setLoading(false); // Set loading menjadi false setelah respons diterima
      }
    };
    verifyEmail();
  }, [token]);

  if (loading) {
    return (
      <Typography variant="h5" align="center">
        Verifying your email, please wait...
      </Typography>
    );
  }

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
          gap: 2,
        }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            width: { xs: 380, sm: 500 },
            height: 280,
            borderRadius: 2,
            boxShadow: 3,
          }}>
          <Box>
            <CheckBadgeIcon
              style={{
                height: 150,
                width: 150,
                alignSelf: "center",
                color: "#016FDD",
              }}
            />
          </Box>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {message}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default VerifyEmail;
