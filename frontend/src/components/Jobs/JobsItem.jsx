import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";
import getBlogTheme from "../Article/theme/getBlogTheme.jsx";
import Loaders from "../Loaders/Loaders.jsx";
import DOMPurify from "dompurify";
import { marked } from "marked";
import {
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  BanknotesIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

export default function JobsItem() {
  const defaultTheme = createTheme();
  const [mode] = useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [jobs, setJobs] = useState({
    job_title: "",
    company: "",
    location: "",
    work_type: "",
    salary: "",
    link_img: "",
    description: "",
  });

  const getTimeAgo = (updatedAt) => {
    if (!updatedAt) return "Unknown time";
    const now = new Date();

    let updatedDate;
    try {
      updatedDate = parseISO(updatedAt);
    } catch (error) {
      return "Invalid date";
    }

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

  const truncateContent = (content, maxLength) => {
    if (!content) return "Loading content...";
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/jobs/${id}`
        );
        setJobs(response.data.data);
      } catch (err) {
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchJobs();
  }, [id]);

  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    const fetchJobsList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/jobs`
        );
        setJobsList(response.data);
      } catch (err) {
        setAlertMessage("Terjadi kesalahan saat mengambil data");
        setAlertSeverity("error");
        setAlertOpen(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchJobsList();
  }, [id]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
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
          my: { xs: 15, md: 16 },
          gap: 4,
        }}>
        <Breadcrumb />
        {loading ? (
          <div className="flex justify-center items-center h-full my-72">
            <Loaders size={70} />
          </div>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
            }}>
            <Card
              sx={{
                width: { xs: "100%", md: 820 },
                height: { xs: "auto", md: "100%" },
                padding: 0,
              }}>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 3,
                  }}>
                  <Grid
                    xs={12}
                    sm={6}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 1,
                      alignItems: "center",
                    }}>
                    <Box
                      component="img"
                      src={jobs.link_img}
                      alt="Company Logo"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        borderRadius: 1,
                        border: 1,
                        borderColor: "grey.300",
                      }}
                    />
                  </Grid>

                  <Grid xs={12}>
                    <Typography variant="h4" component="div">
                      {jobs.job_title}
                    </Typography>
                  </Grid>

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
                      <Typography>{jobs.company}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                      <MapPinIcon style={{ height: 24, width: 24 }} />
                      <Typography>{jobs.location}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}>
                      <BriefcaseIcon style={{ height: 24, width: 24 }} />
                      <Typography>{jobs.category}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                      <ClockIcon style={{ height: 24, width: 24 }} />
                      <Typography>{jobs.work_type}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                      <BanknotesIcon style={{ height: 24, width: 24 }} />
                      <Typography>{jobs.salary} /month</Typography>
                    </Box>

                    <Typography
                      variant="caption"
                      color="error"
                      sx={{
                        display: "flex",
                      }}>
                      Diunggah{""} {getTimeAgo(jobs.updatedAt)}
                    </Typography>
                  </Box>

                  <Button
                    sx={{
                      width: { xs: "30%", md: "14%" },
                      fontWeight: "bold",
                    }}
                    variant="contained"
                    color="secondary"
                    size="small"
                    href={jobs.link ? jobs.link : "#"}>
                    Apply Now
                  </Button>

                  <Grid xs={12}>
                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                      Description
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      dangerouslySetInnerHTML={{
                        __html: jobs.description
                          ? DOMPurify.sanitize(marked(jobs.description))
                          : "Loading content...",
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box
              sx={{
                mt: { xs: 4, md: 0 },
                width: { xs: "100%", md: 300 },
                height: { xs: "auto", md: "100%" },
              }}>
              {jobsList && jobsList.length > 0 ? (
                jobsList
                  .filter((otherJobs) => otherJobs.id !== jobs.id)
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 20)
                  .map((otherJobs) => (
                    <Card
                      key={otherJobs.id}
                      sx={{
                        width: "100%",
                        height: "100%",
                        padding: 0,
                        mb: 2,
                      }}>
                      <Grid
                        component="a"
                        href={`/jobs/${otherJobs.id}`}
                        style={{ textDecoration: "none" }}>
                        <Grid
                          xs={12}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            padding: 2,
                          }}>
                          <Box
                            component="img"
                            src={otherJobs.link_img}
                            alt="Company Logo"
                            sx={{
                              maxWidth: 50,
                              maxHeight: 50,
                              borderRadius: 1,
                              border: 1,
                              borderColor: "grey.300",
                            }}
                          />
                          <Typography variant="h6" component="div">
                            {otherJobs.job_title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                            }}>
                            <Typography
                              variant="Body1"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <BuildingOffice2Icon
                                style={{
                                  height: 24,
                                  width: 24,
                                }}
                                className="mr-1"
                              />
                              {otherJobs.company}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
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
                                className="mr-1"
                              />
                              {otherJobs.location}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            color="textPrimary"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                marked(
                                  truncateContent(otherJobs.description, 1000)
                                )
                              ),
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{
                              display: "flex ",
                            }}>
                            Diunggah{""} {getTimeAgo(otherJobs.updatedAt)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  ))
              ) : (
                <Typography variant="body2">
                  No other jobs available.
                </Typography>
              )}
            </Box>
          </Grid>
        )}
        <ThemeProvider theme={defaultTheme}>
          <Snackbar
            open={alertOpen}
            autoHideDuration={2000}
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
