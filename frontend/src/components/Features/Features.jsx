import * as React from "react";
import PropTypes from "prop-types";
import { Container, Box, Button, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiChip from "@mui/material/Chip";
import {
  BookmarkIcon,
  CogIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";

const items = [
  {
    icon: <CogIcon />,
    title: "Integrasi Lowongan Pekerjaan",
    description:
      "Jelajahi ribuan lowongan kerja dari berbagai platform, semuanya dalam satu tempat. Tidak perlu repot berpindah-pindah situs, cukup dengan Makarya, semua informasi lowongan ada dalam genggaman Anda.",
    imageLight: 'url("https://i.ibb.co.com/bRYF1PT/12463953-4966428.jpg")',
  },
  {
    icon: <BookmarkIcon />,
    title: "Simpan Lowongan Pekerjaan",
    description:
      "Simpan pekerjaan impian Anda dengan mudah! memungkinkan Anda menyimpan lowongan pekerjaan favorit untuk diakses kapan saja, membantu Anda mengelola pencarian karir dengan lebih efisien. Jangan lewatkan peluang terbaik, mulai sekarang!",
    imageLight: 'url("https://i.ibb.co.com/xhYLF3h/5463047-2808304.jpg")',
  },
  {
    icon: <NewspaperIcon />,
    title: "Artikel",
    description:
      "Kami hadir dengan beragam artikel penuh tips dan panduan untuk mendukung perkembangan karir Anda. Temukan inspirasi, panduan, dan pengetahuan yang Anda butuhkan untuk sukses dalam dunia kerja.",
    imageLight: 'url("https://i.ibb.co.com/KjzStG5/12704403-5002471.jpg")',
  },
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: theme.palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
      },
    },
  ],
}));

function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}>
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={title}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <Box
          sx={{
            mb: 2,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            backgroundImage: "var(--items-imageLight)",
          }}
          style={
            items[selectedItemIndex]
              ? {
                  "--items-imageLight": items[selectedItemIndex].imageLight,
                }
              : {}
          }
        />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}>
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

MobileLayout.propTypes = {
  handleItemClick: PropTypes.func.isRequired,
  selectedFeature: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.element,
    imageDark: PropTypes.string,
    imageLight: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};

export { MobileLayout };

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container
      id="features"
      sx={{ py: { xs: 8, sm: 16 }, px: { xs: 0, sm: 0 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}>
          Temukan Pekerjaan Lebih Mudah dengan Makarya
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}>
          Kami memahami betapa pentingnya kemudahan dalam mencari dan menyimpan
          informasi pekerjaan. Di Makarya, kami menghadirkan berbagai fitur yang
          dirancang khusus untuk mempermudah perjalanan karir Anda.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}>
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}>
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={title}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}>
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}>
                  <Typography className="h-5 w-5">{icon}</Typography>

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "70%" },
            height: "var(--items-image-height)",
          }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}>
            <Box
              sx={{
                m: "auto",
                width: 500,
                height: 500,
                backgroundSize: "contain",
                backgroundImage: "var(--items-imageLight)",
              }}
              style={
                items[selectedItemIndex]
                  ? {
                      "--items-imageLight": items[selectedItemIndex].imageLight,
                    }
                  : {}
              }
            />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
