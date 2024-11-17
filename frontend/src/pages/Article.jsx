import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
} from "@mui/material";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import MainContent from "../components/Article/components/MainContent";
import Latest from "../components/Article/components/Latest";
import getBlogTheme from "../components/Article/theme/getBlogTheme";

export default function Blog() {
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}>
        <Breadcrumb />
        <MainContent />
        <Latest />
      </Container>
    </ThemeProvider>
  );
}
