import { Link as RouterLink, useLocation } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import {
  HomeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  PencilSquareIcon,
  QueueListIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const iconMapping = {
  home: <HomeIcon className="h-5 w-5 mr-1" />,
  jobs: <BriefcaseIcon className="h-5 w-5 mr-1" />,
  articles: <NewspaperIcon className="h-5 w-5 mr-1" />,
  articlesform: <PencilSquareIcon className="h-5 w-5 mr-1" />,
  articleslist: <QueueListIcon className="h-5 w-5 mr-1" />,
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function DynamicBreadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        component={RouterLink}
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        to="/">
        {iconMapping.home}
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        const icon = iconMapping[value.toLowerCase()] || (
          <InformationCircleIcon className="h-5 w-5 mr-1" />
        );

        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography
            key={to}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
            }}>
            {icon}
            {capitalize(value)}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to={to}>
            {icon}
            {capitalize(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
