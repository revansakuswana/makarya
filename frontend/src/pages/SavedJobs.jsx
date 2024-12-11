import { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import { BookmarkIcon, BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import getBlogTheme from "../components/Article/theme/getBlogTheme";
import Bookmark from "../components/Bookmark/Bookmark";
import Loaders from "../components/Loaders/Loaders";
import axios from "axios";

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

const SavedJobs = () => {
  const [mode] = useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/saved-jobs`,
          { withCredentials: true }
        );
        setSavedJobs(response.data.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchSavedJobs();
  }, []);

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

        <Box
          direction="column"
          sx={{
            width: "100%",
            textAlign: "left",
            alignItems: "flex-start",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <BookmarkIcon style={{ width: 30, height: 30, marginRight: 5 }} />{" "}
            <Typography variant="h3" component="h1" fontWeight="bold">
              Saved Jobs
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2">
              lowongan kerja yang disimpan
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-col gap-5 lg:col-span-3">
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
                  my: 25,
                }}>
                <Loaders size={70} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Box className="w-full">
                  {savedJobs.length > 0 ? (
                    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                      {savedJobs.map((item) => (
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
                                  <Bookmark jobsId={item.id.toString()} />
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
                                        transition: "color 0.3s ease-in-out",
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
                                        transition: "color 0.3s ease-in-out",
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
                                    variant="body2"
                                    sx={{
                                      fontWeight: "bold",
                                      color: "primary.main",
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
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "center", md: "center" },
                        textAlign: { xs: "center", md: "center" },
                        justifyContent: "center",
                      }}>
                      <ShoppingBagIcon style={{ width: 96, height: 96 }} />
                      <Typography
                        variant="h6"
                        component="h2"
                        fontWeight="bold"
                        mt={2}>
                        Belum ada lowongan pekerjaan yang disimpan
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Simpan lowongan pekerjaan yang anda minati agar Anda
                        dapat melihatnya kembali nanti.
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SavedJobs;
