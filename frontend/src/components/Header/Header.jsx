import { useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import userImg from "../../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";

const navLinks = [
  {
    path: "/Home",
    display: "Home",
  },
  {
    path: "/jobs",
    display: "Find Jobs",
  },
  {
    path: "/careertips",
    display: "Career Tips",
  },
  {
    path: "/about",
    display: "About Us",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
    <header className="sticky top-0 header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* === logo ===*/}
          <a href="/Home">
            <img src={logo} alt="" />
          </a>

          {/* === menu ===*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu font-bold flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primary text-[16px] leading-7 font-bold"
                        : "text-textColor text-[16px] leading-7 font-bold"
                    }>
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* === nav right ===*/}
          <div className="flex items-center gap-4">
            <div className="hidden">
              <Link to="/">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img src={userImg} className="w-full rounded-full" alt="" />
                </figure>
              </Link>
            </div>

            <Link to="/login">
              <button className="bg-primary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[8px] hover:bg-hover hover:drop-shadow-lg transition ease-in-out delay-50 hover:-translate-y-0.5 duration-300">
                Login
              </button>
            </Link>
            <button
              method="DELETE"
              className="bg-primary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[8px] hover:bg-hover hover:drop-shadow-lg transition ease-in-out delay-50 hover:-translate-y-0.5 duration-300">
              Logout
            </button>
            <Avatar {...stringAvatar("Alvio Q")} />
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
