import { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  TablePagination,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";
import getBlogTheme from "./theme/getBlogTheme.jsx";
import Loaders from "../Loaders/Loaders.jsx";
import { marked } from "marked";

const ArticleList = () => {
  const defaultTheme = createTheme();
  const [mode] = useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/user/articles",
          { withCredentials: true }
        );
        console.log("Response:", response); // Tambahkan log respons
        setArticles(response.data.data);
      } catch (err) {
        console.error("Error fetching articles:", err); // Tambahkan log error
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getExcerpt = (content, maxLength = 150) => {
    const htmlContent = marked(content);
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText.length <= maxLength
      ? plainText
      : plainText.slice(0, maxLength) + "...";
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedArticles = Array.isArray(articles)
    ? articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleOpenDialog = (id) => {
    setArticleIdToDelete(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setArticleIdToDelete(null);
  };

  const handleDeleteArticle = async () => {
    if (articleIdToDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/articles/${articleIdToDelete}`,
          { withCredentials: true }
        );
        setAlertMessage("Artikel berhasil dihapus");
        setAlertSeverity("success");
        setAlertOpen(true);
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleIdToDelete)
        );
      } catch (err) {
        setAlertMessage("Terjadi kesalahan saat menghapus artikel");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        handleCloseDialog();
      }
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
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="h6" component="div" sx={{ padding: 2 }}>
            List of Articles
          </Typography>
          <TableContainer>
            {loading ? (
              <div className="flex justify-center items-center h-full my-72">
                <Loaders size={70} />
              </div>
            ) : (
              <Table sx={{ borderCollapse: "collapse", borderRadius: 4 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Author
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Title
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Category
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Image
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Content
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        fontWeight: "bold",
                        padding: 1,
                        textAlign: "center",
                      }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedArticles.map((article, index) => (
                    <TableRow
                      key={article.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternate row colors
                      }}>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        {article.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        {article.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        {article.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        <img
                          src={`http://localhost:3000/public/images/${article.image}`}
                          alt="image cover"
                          style={{
                            width: 200,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          padding: 1,
                        }}>
                        {getExcerpt(article.content, 150)}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #e0e0e0", padding: 1.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                          }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() =>
                              navigate(`/articleslist/${article.id}`)
                            }>
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleOpenDialog(article.id)}>
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <TablePagination
            sx={{ marginTop: 2 }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={articles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <Grid sx={{ textAlign: "center" }}>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogContent>
              <Typography>
                Apakah anda yakin ingin menghapus artikel ini?
              </Typography>
            </DialogContent>
          </Grid>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="secondary">
              Batal
            </Button>
            <Button
              onClick={handleDeleteArticle}
              variant="contained"
              color="error">
              Hapus
            </Button>
          </DialogActions>
        </Dialog>

        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
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

export default ArticleList;
