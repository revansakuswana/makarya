import * as React from "react";
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
  Typography,
  // Divider,
  Box,
} from "@mui/material";
import { ArrowRightIcon, UsersIcon } from "@heroicons/react/24/outline";
import getBlogTheme from "../components/Article/theme/getBlogTheme";

const About = () => {
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
      <ThemeProvider theme={blogTheme}>
        <Container
          maxWidth="lg"
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 16,
            gap: 4,
            direction: "column",
            justifyContent: "space-between",
          }}>
          <CssBaseline />
          <Box sx={{ overflow: "hidden", pt: { xs: 0, sm: 6 } }}>
            <Box className="mx-auto max-w-7xl">
              <Box className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <Box className="mx-auto max-w-7xl content-center sm:static ">
                  <Box className="lg:max-w-lg flex flex-col gap-5">
                    <Box sx={{ display: "flex"}}>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          bgcolor: "#FFF1E0",
                          color: "#DB9B10",
                          borderRadius: 1,
                          px: 2,
                          py: 1,
                          fontSize: "1rem",
                          placeSelf: "center",
                        }}>
                        <UsersIcon
                          style={{
                            height: 17,
                            width: 17,
                            strokeWidth: 3,
                            marginRight: 4,
                            alignSelf: "center",
                          }}
                        />
                        About us
                      </Typography>
                    </Box>

                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "3rem" },
                        fontWeight: "bold",
                        color: "text.primary",
                      }}>
                      We are here to assist you in finding a job.
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.125rem",
                        color: "text.secondary",
                      }}>
                      Platform kami memudahkan individu berbakat seperti Anda
                      untuk menemukan lowongan pekerjaan di berbagai industri
                      dan sektor.
                    </Typography>
                    <Box
                      sx={{
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "translateY(-4px)" },
                      }}>
                      <Button
                        href="/users/signup"
                        color="secondary"
                        variant="contained"
                        sx={{ fontWeight: "bold" }}>
                        Daftar sekarang
                        <ArrowRightIcon
                          style={{
                            height: 17,
                            width: 17,
                            marginLeft: 8,
                            strokeWidth: 3,
                          }}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <img
                  src="https://i.ibb.co.com/PFRkWwV/corporate-woman-posing-office.jpg"
                  alt="Product screenshot"
                  className="w-[48rem] max-w-none ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  width={2432}
                  height={1442}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
};

export default About;
