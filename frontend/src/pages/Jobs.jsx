import * as React from "react";
import { useState, useEffect } from "react";
import {
  CssBaseline,
  Snackbar,
  Alert,
  Container,
  createTheme,
  ThemeProvider,
  Stack,
  Box,
  Typography,
  Button,
  Pagination,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parseISO,
} from "date-fns";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import find from "../assets/images/find.svg";
import Loaders from "../components/Loaders/Loaders";
import getBlogTheme from "../components/Article/theme/getBlogTheme";
import Bookmark from "../components/Bookmark/Bookmark";
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

const Jobs = () => {
  const defaultTheme = createTheme();
  const [mode] = React.useState("light");
  const blogTheme = createTheme(getBlogTheme(mode));

  const [visibleData, setVisibleData] = useState([]); // Data yang terlihat
  const [selectedSearch, setSelectedSearch] = useState(""); // Keyword pencarian
  const [selectedCategory, setSelectedCategory] = useState(""); // Kategori pencarian
  const [selectedLocation, setSelectedLocation] = useState(""); // Lokasi pencarian
  const [sortDirection, setSortDirection] = useState("newest"); // Sorting direction (newest or oldest)

  const [selectedSearchToUse, setSelectedSearchToUse] = useState(""); // Keyword yang digunakan untuk pencarian
  const [selectedCategoryToUse, setSelectedCategoryToUse] = useState(""); // Kategori yang digunakan untuk pencarian
  const [selectedLocationToUse, setSelectedLocationToUse] = useState(""); // Lokasi yang digunakan untuk pencarian

  const [isSearchInitiated, setIsSearchInitiated] = useState(false); // Menyimpan status apakah pencarian telah dimulai
  const [page, setPage] = useState(1); // Halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Menyimpan total halaman untuk paginasi

  const [allSearch, setAllSearch] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // Menyimpan semua kategori
  const [allLocations, setAllLocations] = useState([]); // Menyimpan semua lokasi
  const itemsPerPage = 16; // Jumlah item per halaman

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [loading, setLoading] = useState(false);

  const [selectedWork_Type, setSelectedWork_Type] = useState([]); // Filter untuk Tipe Pekerjaan
  const [selectedWorking_Type, setSelectedWorking_Type] = useState([]); // Filter untuk Kebijakan Kerja
  const [selectedExperience, setSelectedExperience] = useState([]); // Filter untuk Pengalaman
  const [selectedEducation, setSelectedEducation] = useState([]); // Filter untuk Tingkat Pendidikan

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = [
    {
      id: "Tipe Pekerjaan",
      name: "Tipe Pekerjaan",
      options: [
        { value: "Penuh Waktu", label: "Penuh Waktu" },
        { value: "Paruh Waktu", label: "Paruh Waktu" },
        { value: "Kontrak", label: "Kontrak" },
        { value: "Magang", label: "Magang" },
        { value: "Freelance", label: "Freelance" },
        { value: "Harian", label: "Harian" },
      ],
    },
    {
      id: "Kebijakan Kerja",
      name: "Kebijakan Kerja",
      options: [
        { value: "Kerja di kantor", label: "Kerja di kantor" },
        {
          value: "Kerja di kantor / rumah",
          label: "Kerja di kantor / rumah",
        },
        {
          value: "Kerja Remote/dari rumah",
          label: "Kerja Remote/dari rumah",
        },
      ],
    },
    {
      id: "Pengalaman",
      name: "Pengalaman",
      options: [
        {
          value: "Tidak berpengalaman",
          label: "Tidak berpengalaman",
        },
        {
          value: "Fresh Graduate",
          label: "Fresh Graduate",
        },
        {
          value: "Kurang dari setahun",
          label: "Kurang dari setahun",
        },
        { value: "1 – 3 tahun", label: "1 – 3 tahun" },
        { value: "3 – 5 tahun", label: "3 – 5 tahun" },
        { value: "5 – 10 tahun", label: "5 – 10 tahun" },
        {
          value: "Lebih dari 10 tahun",
          label: "Lebih dari 10 tahun",
        },
      ],
    },
    {
      id: "Tingkat Pendidikan",
      name: "Tingkat Pendidikan",
      options: [
        {
          value: "Minimal Doktor (S3)",
          label: "Minimal Doktor (S3)",
        },
        {
          value: "Minimal Magister (S2)",
          label: "Minimal Magister (S2)",
        },
        {
          value: "Minimal Sarjana (S1)",
          label: "Minimal Sarjana (S1)",
        },
        {
          value: "Minimal Diploma (D1 - D4)",
          label: "Minimal Diploma (D1 - D4)",
        },
        { value: "Minimal SMA/SMKl", label: "Minimal SMA/SMK" },
        { value: "Minimal SMP", label: "Minimal SMP" },
        { value: "Minimal SD", label: "Minimal SD" },
      ],
    },
  ];

  const getCheckedState = (filterType, value) => {
    switch (filterType) {
      case "Tipe Pekerjaan":
        return selectedWork_Type.includes(value);
      case "Kebijakan Kerja":
        return selectedWorking_Type.includes(value);
      case "Pengalaman":
        return selectedExperience.includes(value);
      case "Tingkat Pendidikan":
        return selectedEducation.includes(value);
      default:
        return false;
    }
  };

  const handleFilterChange = (event, filterType) => {
    const { value, checked } = event.target;

    const updateFilterState = (stateSetter, currentState) => {
      if (checked) {
        stateSetter([...currentState, value]); // Add value if checked
      } else {
        stateSetter(currentState.filter((item) => item !== value)); // Remove value if unchecked
      }
    };

    switch (filterType) {
      case "Tipe Pekerjaan":
        updateFilterState(setSelectedWork_Type, selectedWork_Type);
        break;
      case "Kebijakan Kerja":
        updateFilterState(setSelectedWorking_Type, selectedWorking_Type);
        break;
      case "Pengalaman":
        updateFilterState(setSelectedExperience, selectedExperience);
        break;
      case "Tingkat Pendidikan":
        updateFilterState(setSelectedEducation, selectedEducation);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/jobs`
        );
        let fetchedData = Array.isArray(response.data) ? response.data : [];
        const search = Array.from(
          new Set(fetchedData.map((item) => item.job_title))
        );
        setAllSearch(search);

        const categories = Array.from(
          new Set(fetchedData.map((item) => item.category))
        );
        setAllCategories(categories);

        const locations = Array.from(
          new Set(fetchedData.map((item) => item.location))
        );
        setAllLocations(locations);

        if (
          !selectedSearchToUse &&
          !selectedCategoryToUse &&
          !selectedLocationToUse
        ) {
          setVisibleData(fetchedData);
        } else {
          fetchedData = fetchedData.filter(
            (item) =>
              (!selectedSearchToUse ||
                item.job_title
                  .toLowerCase()
                  .includes(selectedSearchToUse.toLowerCase()) ||
                item.company
                  .toLowerCase()
                  .includes(selectedSearchToUse.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(selectedSearchToUse.toLowerCase()) ||
                item.skills
                  .toLowerCase()
                  .includes(selectedSearchToUse.toLowerCase())) &&
              (!selectedCategoryToUse ||
                item.category === selectedCategoryToUse) &&
              (!selectedLocationToUse ||
                item.location.includes(selectedLocationToUse))
          );
        }

        fetchedData = fetchedData.filter((item) => {
          const Work_Type =
            selectedWork_Type.length === 0 ||
            selectedWork_Type.includes(item.work_type);
          const Working_Type =
            selectedWorking_Type.length === 0 ||
            selectedWorking_Type.includes(item.working_type);
          const Experience =
            selectedExperience.length === 0 ||
            selectedExperience.includes(item.experience);
          const Education =
            selectedEducation.length === 0 ||
            selectedEducation.includes(item.study_requirement);
          return Work_Type && Working_Type && Experience && Education;
        });

        if (sortDirection === "newest") {
          fetchedData.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
        } else if (sortDirection === "oldest") {
          fetchedData.sort(
            (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
          );
        }

        const totalPagesCalculated = Math.ceil(
          fetchedData.length / itemsPerPage
        );
        setTotalPages(totalPagesCalculated);

        const paginatedData = fetchedData.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );
        setVisibleData(paginatedData);

        if (page > totalPagesCalculated) {
          setPage(Math.min(page, totalPagesCalculated));
        }
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
  }, [
    isSearchInitiated,
    selectedSearchToUse,
    selectedCategoryToUse,
    selectedLocationToUse,
    selectedWork_Type,
    selectedWorking_Type,
    selectedExperience,
    selectedEducation,
    sortDirection,
    page,
  ]);

  const handleSearchChange = (event, newValue) => {
    setSelectedSearch(newValue || event.target.value || "");
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue || "");
  };

  const handleLocationChange = (event, newValue) => {
    setSelectedLocation(newValue || "");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchClick = () => {
    setIsSearchInitiated(true); // Trigger search
    setSelectedSearchToUse(selectedSearch); // Set the actual value for search
    setSelectedCategoryToUse(selectedCategory); // Set the actual value for search
    setSelectedLocationToUse(selectedLocation); // Set the actual value for search
    setPage(1); // Reset ke halaman pertama
  };

  const handleSort = (direction) => {
    setSortDirection(direction);
    setPage(1); // Reset to page 1 on sort change
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
      <ThemeProvider theme={blogTheme}>
        <CssBaseline />
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
          {/* ===== BANNER SEARCH ===== */}
          <Breadcrumb />
          <Box
            sx={{
              maxWidth: "84rem",
              margin: "0 auto",
            }}>
            <Box
              sx={{
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "grey.200",
                borderStyle: "solid",
                display: { lg: "flex" },
                maxWidth: { lg: "none" },
              }}
              style={{
                backgroundImage:
                  "url('https://i.ibb.co.com/ZYSzFCt/101465.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  textAlign: "center",
                  py: 4,
                  px: 5,
                }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: { xs: "3xl", lg: "5xl" },
                  }}>
                  Cari Pekerjaan yang Kamu Inginkan
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontSize: { xs: "md", lg: "xl" },
                    fontWeight: "medium",
                    display: { xs: "none", sm: "block" },
                  }}>
                  Temukan pekerjaan yang sesuai dengan keahlian dan minatmu.
                  Kami menyediakan berbagai lowongan pekerjaan dari berbagai
                  industri yang siap membantumu membangun karier yang kamu
                  impikan.
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "white",
                    marginX: { xs: 0, sm: 10 },
                    borderRadius: 1,
                    boxShadow: 2,
                    p: 2,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      gap: 2,
                    }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}>
                      <MagnifyingGlassIcon
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: 15,
                          color: "grey",
                        }}
                      />
                      <Autocomplete
                        freeSolo
                        fullWidth
                        options={allSearch}
                        value={selectedSearch}
                        onChange={handleSearchChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Masukkan kata kunci"
                            slotProps={{
                              ...params.InputProps,
                              className:
                                "w-full bg-transparent focus:outline-none text-gray-500",
                            }}
                            onChange={handleSearchChange}
                          />
                        )}
                        sx={{
                          "& .MuiAutocomplete-clearIndicator": {
                            fontSize: "1.5rem",
                            width: "30px",
                            height: "30px",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}>
                      <BriefcaseIcon
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: 15,
                          color: "grey",
                        }}
                      />
                      <Autocomplete
                        freeSolo
                        fullWidth
                        options={allCategories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Masukkan category"
                            slotProps={{
                              ...params.InputProps,
                              className:
                                "w-full bg-transparent focus:outline-none text-gray-500",
                            }}
                          />
                        )}
                        sx={{
                          "& .MuiAutocomplete-clearIndicator": {
                            fontSize: "1.5rem",
                            width: "30px",
                            height: "30px",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}>
                      <MapPinIcon
                        style={{
                          height: 30,
                          width: 30,
                          marginRight: 15,
                          color: "grey",
                        }}
                      />
                      <Autocomplete
                        freeSolo
                        fullWidth
                        options={allLocations}
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Masukkan Lokasi"
                            slotProps={{
                              ...params.InputProps,
                              className:
                                "w-full bg-transparent focus:outline-none text-gray-500",
                            }}
                          />
                        )}
                        sx={{
                          "& .MuiAutocomplete-clearIndicator": {
                            fontSize: "1.5rem",
                            width: "30px",
                            height: "30px",
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "center", sm: "flex-start" },
                      }}>
                      <Button
                        onClick={handleSearchClick}
                        sx={{
                          backgroundColor: "primary.main",
                          width: { xs: "100%", sm: "auto" },
                          fontWeight: "bold",
                          p: 2,
                          color: "white",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}>
                        Search
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Jobs grid */}
          <Box>
            {/* Mobile filter dialog */}
            <Dialog
              open={mobileFiltersOpen}
              onClose={setMobileFiltersOpen}
              className="relative z-40 lg:hidden">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <Box
                sx={{
                  backgroundColor: "white",
                  position: "fixed",
                  display: "flex",
                  top: 0,
                  inset: 0,
                  zIndex: 40,
                }}>
                <DialogPanel
                  transition
                  className="relative mx-auto flex h-full w-full transform flex-col overflow-y-auto py-32 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-y-full">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 3,
                    }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "medium", color: "gray.900" }}>
                      Filter
                    </Typography>
                    <IconButton
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "gray.400",
                      }}>
                      <span className="sr-only">Close menu</span>
                      <XCircleIcon
                        aria-hidden="true"
                        style={{
                          height: 30,
                          width: 30,
                          color: "grey",
                        }}
                      />
                    </IconButton>
                  </Box>

                  {/* Filters Mobile */}
                  <Box
                    component="form"
                    sx={{
                      borderColor: "gray.200",
                      marginTop: 2,
                      paddingX: 3,
                    }}>
                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <Typography
                              variant="h6"
                              sx={{
                                my: -3,
                                display: "flow-root", // MUI tidak memiliki properti flow-root, tetapi Anda dapat menggunakan display: 'block'
                              }}>
                              <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </Typography>

                            <Transition
                              show={open}
                              enter="transition-all duration-300 ease-in"
                              enterFrom="transform opacity-0"
                              enterTo="transform opacity-100 max-h-screen"
                              leave="transition-all duration-300 ease-out"
                              leaveFrom="transform opacity-100 max-h-screen"
                              leaveTo="transform opacity-0">
                              <DisclosurePanel className="pt-6 overflow-hidden transition-all duration-300">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center">
                                      <input
                                        value={option.value}
                                        checked={getCheckedState(
                                          section.name,
                                          option.value
                                        )} // Menggunakan fungsi untuk mendapatkan nilai checked
                                        onChange={(e) =>
                                          handleFilterChange(e, section.name)
                                        }
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </Box>
                </DialogPanel>
              </Box>
            </Dialog>

            <main className="mx-auto max-w-7xl">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 2,
                  borderBottom: "1px solid",
                  borderColor: "grey.200",
                  paddingBottom: 1,
                }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                  }}>
                  Info Lowongan Kerja di Indonesia
                </Typography>

                <Box sx={{ display: "flex", justifyItems: "center" }}>
                  <Menu as="div" className="relative inline-block text-left">
                    <Box>
                      <MenuButton className="group inline-flex justify-center text-sm font-medium text-black">
                        Sort
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-black"
                        />
                      </MenuButton>
                    </Box>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-35 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                      <Box>
                        <MenuItem key="newest">
                          <a
                            className="flex px-4 py-2 text-sm rounded-md text-black hover:bg-gray-100"
                            onClick={() => handleSort("newest")}>
                            Newest
                          </a>
                        </MenuItem>
                        <MenuItem key="oldest">
                          <a
                            className="flex px-4 py-2 text-sm rounded-md text-black hover:bg-gray-100"
                            onClick={() => handleSort("oldest")}>
                            Oldest
                          </a>
                        </MenuItem>
                      </Box>
                    </MenuItems>
                  </Menu>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                    <span className="sr-only">Filters</span>
                    <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </Box>
              </Box>

              <section aria-labelledby="products-heading" className="pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>

                            <Transition
                              show={open}
                              enter="transition-all duration-300 ease-in"
                              enterFrom="transform opacity-0"
                              enterTo="transform opacity-100 max-h-screen"
                              leave="transition-all duration-300 ease-out"
                              leaveFrom="transform opacity-100 max-h-screen"
                              leaveTo="transform opacity-0">
                              <DisclosurePanel className="pt-6 overflow-hidden transition-all duration-300">
                                <div className="space-y-4">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center">
                                      <input
                                        value={option.value}
                                        checked={getCheckedState(
                                          section.name,
                                          option.value
                                        )}
                                        onChange={(e) =>
                                          handleFilterChange(e, section.name)
                                        }
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600">
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </DisclosurePanel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* CARD */}
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
                          <Box className="w-full">
                            {visibleData.length > 0 ? (
                              <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 justify-items-center">
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
                                                  backgroundColor:
                                                    "primary.main",
                                                  color: "white",
                                                },
                                                transition:
                                                  "all 0.3s ease-in-out",
                                              }}
                                              href={
                                                item.link ? item.link : "#"
                                              }>
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
                              <Box className="flex flex-col items-center text-center">
                                <img
                                  src={find}
                                  alt="No jobs found"
                                  className="mx-auto h-96"
                                />
                                <Typography variant="h5" fontWeight="bold">
                                  Tidak ada pekerjaan yang ditemukan untuk
                                  pencarian ini
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                  Tidak ditemukan hasil pencarian yang sesuai{" "}
                                  <br />
                                  Coba ubah filter atau periksa penulisanmu
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Box>

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

                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Stack>
                          <Pagination
                            count={Math.min(totalPages)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                          />
                        </Stack>
                      </Box>
                    </ThemeProvider>
                  </Box>
                </div>
              </section>
            </main>
          </Box>
        </Container>
      </ThemeProvider>
  );
};

export default Jobs;
