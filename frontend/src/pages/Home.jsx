import * as React from "react";
import {
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Pagination,
  Snackbar,
  Stack,
  Alert,
  Button,
  Typography,
  // Divider,
  Box,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import getBlogTheme from "../components/Article/theme/getBlogTheme";
// import Bookmark from "../components/Bookmark/Bookmark";
import Loaders from "../components/Loaders/Loaders";
import Features from "../components/Features/Features";
import hero from "../assets/images/hero.png";
import find from "../assets/images/find.svg";
import axios from "axios";

// const stats = [
//   { name: "Jobs", value: "550K" },
//   { name: "Startups", value: "10K" },
//   { name: "Recruitment", value: "345K" },
// ];

const getTimeAgo = (updatedAt) => {
  const now = new Date();
  const updatedDate = parseISO(updatedAt);

  const days = Math.abs(differenceInDays(now, updatedDate));
  if (days > 0) {
    return `${days} hari yang lalu`;
  }

  const hours = Math.abs(differenceInHours(now, updatedDate));
  if (hours > 0) {
    return `${hours} jam yang lalu`;
  }

  const minutes = Math.abs(differenceInMinutes(now, updatedDate));
  if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  }

  const seconds = Math.abs(differenceInSeconds(now, updatedDate));
  return `${seconds} detik yang lalu`;
};

const Home = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [visibleData, setVisibleData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/jobs`);
        let fetchedData = Array.isArray(response.data) ? response.data : [];

        fetchedData.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        const paginatedData = fetchedData.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );
        setVisibleData(paginatedData);
        const totalPagesCalculated = Math.ceil(
          fetchedData.length / itemsPerPage
        );
        setTotalPages(totalPagesCalculated);
      } catch (error) {
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={blogTheme}>
        <CssBaseline enableColorScheme />
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
          {/* ===== HERO SECTION ===== */}
          <Box sx={{ overflow: "hidden", pt: { xs: 0, sm: 6 } }}>
            <Box className="mx-auto max-w-7xl">
              <Box className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <Box className="mx-auto max-w-7xl content-center sm:static ">
                  <Box className="lg:max-w-lg flex flex-col gap-5">
                    <Typography
                      variant="body2"
                      sx={{
                        bgcolor: "#FFF1E0",
                        color: "#DB9B10",
                        display: "inline-block",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        fontSize: "1rem",
                        placeSelf: "center",
                      }}>
                      🏅 Platform pencarian kerja terkemuka di dunia
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "3rem" },
                        fontWeight: "bold",
                        color: "text.primary",
                      }}>
                      Temukan{" "}
                      <span style={{ color: "#336aea" }}>Pekerjaan</span> yang
                      Anda Butuhkan Sekarang
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
                  src={hero}
                  alt="Product screenshot"
                  className="w-[48rem] max-w-none ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                  width={2432}
                  height={1442}
                />
              </Box>
            </Box>
          </Box>
          <Features />
          {/* ===== PERFORMANCE SECTION ===== */}
          {/* <Box
            sx={{
              position: "relative",
              overflow: "hidden",
            }}>
            <Container>
              <Grid
                container
                spacing={4}
                sx={{
                  borderRadius: 2,
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "space-between" },
                }}>
                <Grid xs={12} md={6} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                      fontWeight: "bold",
                      color: "black",
                    }}>
                    <span style={{ color: "#336aea" }}>
                      Kinerja produktivitas{" "}
                    </span>
                    kami
                  </Typography>
                </Grid>

                <Grid xs={12} md={6}>
                  <Grid
                    container
                    spacing={3}
                    divider={<Divider orientation="vertical" flexItem />}>
                    {stats.map((stat) => (
                      <Grid xs={4} key={stat.name} sx={{ textAlign: "center" }}>
                        <Typography
                          variant="body1"
                          sx={{ color: "black", fontSize: "1rem" }}>
                          {stat.name}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: "bold", color: "black", pt: 2 }}>
                          <span style={{ color: "#336aea", fontWeight: "600" }}>
                            +{" "}
                          </span>
                          {stat.value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box> */}
          {/* ===== JOB SECTION ===== */}
          <Box
            sx={{
              maxWidth: "7xl",
              mx: "auto",
              px: { xs: 0, sm: 0 },
            }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  bgcolor: "#FFF1E0",
                  color: "#DB9B10",
                  display: "inline-block",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                }}>
                🔎 Jelajahi Pekerjaan
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontWeight: "bold", mt: 2, color: "text.primary" }}>
                Pekerjaan <span style={{ color: "#336aea" }}>terbaru</span>{" "}
                minggu ini.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "text.secondary" }}>
                Temukan lebih dari 10 ribu lowongan kerja impian Anda.
              </Typography>
            </Box>

            {/* ===== JOBS CARD ===== */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                xs={12}
                lg={3}
                sx={{ display: "flex", flexDirection: "column" }}
                aria-label="card section">
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      my: 80,
                    }}>
                    <Loaders size={70} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}>
                    <div className="w-full">
                      {visibleData.length > 0 ? (
                        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                          {visibleData.map((item) => (
                            <Box
                              key={item.id}
                              sx={{
                                width: "100%",
                                maxWidth: 410,
                              }}>
                              <Box>
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    p: "20px",
                                    border: 1,
                                    backgroundColor: "grey.50",
                                    borderColor: "grey.300",
                                    borderRadius: 1,
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                      backgroundColor: "white",
                                      boxShadow: 3,
                                      borderColor: "primary.main",
                                    },
                                  }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      gap: 2,
                                    }}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1,
                                      }}>
                                      <Box
                                        component="img"
                                        src={item.link_img}
                                        alt="Company Logo"
                                        sx={{
                                          maxWidth: 200,
                                          height: 50,
                                          borderRadius: 1,
                                          border: 1,
                                          borderColor: "grey.300",
                                        }}
                                      />
                                      {/* <Box className="w-[40px] h-[40px] p-1 rounded border border-gray-200">
                                        <Bookmark jobId={item.id}/>
                                      </Box> */}
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}>
                                      <a href={`/jobs/${item.id}`}>
                                        <Typography
                                          variant="h6"
                                          fontWeight="bold"
                                          noWrap
                                          sx={{
                                            color: "text.primary",
                                            transition:
                                              "color 0.3s ease-in-out",
                                            "&:hover": {
                                              color: "primary.main",
                                            },
                                          }}>
                                          {item.job_title}
                                        </Typography>
                                      </a>
                                    </Box>
                                    <Box className="flex flex-wrap gap-2">
                                      <button className="rounded-md bg-gray-200 p-1.5 text-sm font-medium text-black shadow-sm hover:text-primary transition ease-in-out duration-300">
                                        {item.work_type}
                                      </button>
                                      <button className="rounded-md bg-gray-200 p-1.5 text-sm font-medium text-black shadow-sm hover:text-primary transition ease-in-out duration-300">
                                        {item.working_type}
                                      </button>
                                      <button className="rounded-md bg-gray-200 p-1.5 text-sm font-medium text-black shadow-sm hover:text-primary transition ease-in-out duration-300">
                                        {item.experience}
                                      </button>
                                      <button className="rounded-md bg-gray-200 p-1.5 text-sm font-medium text-black shadow-sm hover:text-primary transition ease-in-out duration-300">
                                        {item.study_requirement}
                                      </button>
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
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}>
                                        <BuildingOffice2Icon
                                          style={{
                                            height: 24,
                                            width: 24,
                                          }}
                                          className="mr-2"
                                        />
                                        <Typography
                                          variant="h6"
                                          sx={{
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            transition:
                                              "color 0.3s ease-in-out",
                                            "&:hover": {
                                              color: "primary.main",
                                            },
                                          }}>
                                          {item.company}
                                        </Typography>
                                      </Box>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          fontSize: "0.875rem",
                                          gap: 1,
                                          color: "black",
                                        }}>
                                        <Typography
                                          variant="Body1"
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}>
                                          <MapPinIcon
                                            style={{
                                              height: 24,
                                              width: 24,
                                            }}
                                            className="mr-2"
                                          />
                                          {item.location}
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        color: "gray",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                      }}>
                                      Skills: {item.skills}
                                    </Typography>
                                    <Box className="flex items-end">
                                      <Typography
                                        variant="body2" // Menggunakan variant yang sesuai, seperti h6 untuk ukuran kecil
                                        sx={{
                                          fontWeight: "bold", // font-semibold
                                          color: "primary.main", // text-primary, pastikan Anda telah mendefinisikan primary dalam tema MUI
                                        }}>
                                        {item.salary}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: "text.secondary",
                                          marginLeft: "8px",
                                        }}>
                                        /Month
                                      </Typography>
                                    </Box>
                                    <Box className="flex justify-between">
                                      <Typography
                                        variant="body2"
                                        color="error"
                                        sx={{
                                          alignContent: "end",
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis",
                                        }}>
                                        {getTimeAgo(item.updatedAt)}
                                      </Typography>

                                      <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          fontWeight: "bold",
                                          padding: 1,
                                          color: "primary.main",
                                          borderColor: "primary.main",
                                          "&:hover": {
                                            backgroundColor: "primary.main",
                                            color: "white",
                                          },
                                          transition: "all 0.3s ease-in-out",
                                        }}
                                        href={item.link ? item.link : "#"}>
                                        Apply Now
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Grid>
                      ) : (
                        <Box className="flex flex-col items-center text-center">
                          <img
                            src={find}
                            alt="No jobs found"
                            className="mx-auto h-96"
                          />
                          <Typography variant="h5" fontWeight="bold">
                            Tidak ada pekerjaan yang ditemukan untuk pencarian
                            ini
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 2 }}>
                            Tidak ditemukan hasil pencarian yang sesuai <br />
                            Coba ubah filter atau periksa penulisanmu
                          </Typography>
                        </Box>
                      )}
                    </div>
                  </Box>
                )}
              </Box>

              <ThemeProvider theme={defaultTheme}>
                {/* ====== ALERT ====== */}
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

                {/* ====== PAGINATION ====== */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack>
                    <Pagination
                      count={Math.min(totalPages, 5)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Stack>
                </Box>
              </ThemeProvider>

              <Grid sx={{ textAlign: "center" }}>
                <Button
                  href="/jobs"
                  color="secondary"
                  variant="contained"
                  sx={{ fontWeight: "bold" }}>
                  Lowongan lainnya
                  <ArrowRightIcon
                    style={{
                      height: 17,
                      width: 17,
                      marginLeft: 8,
                      strokeWidth: 3,
                    }}
                  />
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
