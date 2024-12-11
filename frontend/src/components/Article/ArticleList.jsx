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
          `${import.meta.env.VITE_BASE_URL}/api/user/articles`,
          { withCredentials: true }
        );
        if (response.data?.data) {
          setArticles(response.data.data);
        }
      } catch (err) {
        setAlertMessage(err.response.data.msg);
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
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/articles/${articleIdToDelete}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setAlertMessage(response.data.msg);
          setAlertSeverity("success");
          setAlertOpen(true);
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article.id !== articleIdToDelete)
          );
        }
      } catch (err) {
        setAlertMessage(err.response.data.msg);
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
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Author
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Title
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Category
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Image
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
                      }}>
                      Content
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #e0e0e0",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: 1,
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
                        {article.author.name}
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
                          minWidth: 200,
                          MaxWidth: 200,
                          textAlign: "center",
                          border: "1px solid #e0e0e0",
                          justifyItems: "center",
                          padding: 1,
                        }}>
                        <img
                          src={`${
                            import.meta.env.VITE_BASE_URL
                          }/public/images/${article.image}`}
                          alt="img cover"
                          style={{
                            objectFit: "cover",
                            maxWidth: 200,
                            height: "auto",
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
                        {getExcerpt(article.content, 500)}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: 50,
                          border: "1px solid #e0e0e0",
                          padding: 1.5,
                        }}>
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
          <Box sx={{ textAlign: "center" }}>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogContent>
              <Typography>
                Apakah anda yakin ingin menghapus artikel ini?
              </Typography>
            </DialogContent>
          </Box>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              color="secondary"
              size="small">
              Batal
            </Button>
            <Button
              onClick={handleDeleteArticle}
              variant="contained"
              color="error"
              size="small">
              Hapus
            </Button>
          </DialogActions>
        </Dialog>

        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={1500}
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
