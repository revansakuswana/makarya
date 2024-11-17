import * as React from "react";
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import getBlogTheme from "../components/Article/theme/getBlogTheme";
import { Grid } from "@mui/joy";

const SavedJobs = () => {
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
          alignItems: "center",
          justifyContent: "center",
          my: 16,
          gap: 4,
        }}>
        <CssBaseline />

        <Grid
          container
          direction="column"
          sx={{
            width: "100%",
            textAlign: "left",
            alignItems: "flex-start",
          }}>
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <BookmarkIcon style={{ width: 30, height: 30, marginRight: 5 }} />{" "}
            <Typography variant="h3" component="h1" fontWeight="bold">
              Bookmark
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">
              lowongan kerja yang disimpan
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "center" },
            textAlign: { xs: "center", md: "center" },
            justifyContent: "center",
          }}>
          <ShoppingBagIcon style={{ width: 96, height: 96 }} />
          <Typography variant="h6" component="h2" fontWeight="bold" mt={2}>
            Belum ada lowongan pekerjaan yang disimpan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Simpan lowongan pekerjaan yang anda minati agar Anda dapat
            melihatnya kembali nanti.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SavedJobs;
