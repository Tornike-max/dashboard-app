import { Link, NavLink, useLocation } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { Tooltip } from "@mui/material";
import { HiOutlineXCircle } from "react-icons/hi2";

import { useStateContext } from "../contexts/useToggleSidebar";
import { links } from "../data/dummy";
import { useChangeColor } from "../contexts/useChangeColor";
// import { links } from "../data/dummy";

// eslint-disable-next-line react-refresh/only-export-components

export default function SideBar() {
  const { isActive: activeMenu, setIsActive, screenSize } = useStateContext();
  const { pathname } = useLocation();
  const { isDark, selectedColor } = useChangeColor();
  function handleCloseSideBar() {
    if (activeMenu && screenSize !== null && screenSize <= 900) {
      setIsActive(false);
    }
  }

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2 rounded-lg text-white  text-md m-2`;
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2 rounded-lg text-md text-gray-700 dark:text-gray-500 dark:hover:bg-slate-100 dark:hover:text-black dark:font-semibold hover:bg-light-gray m-2";

  return (
    <div
      className={`${
        isDark && "bg-slate-800"
      } ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10`}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center z-50">
            <Link
              to="/"
              onClick={() => setIsActive(false)}
              className={`${
                isDark ? "text-slate-100" : "text-slate-900"
              } flex items-center gap-3 ml-3 text-xl font-extrabold tracking-tight   my-4`}
            >
              <SiShopware />
              <span>Shoppy</span>
            </Link>
            <Tooltip title="Close" placement="bottom-start">
              <button
                className={`p-3 rounded-full hover:bg-stone-100 text-${selectedColor} duration-200 transiti`}
                onClick={() => setIsActive(false)}
              >
                <HiOutlineXCircle className="text-xl" />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10">
            {links.map((items) => (
              <div key={items.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {items.title}
                </p>
                {items.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={() => handleCloseSideBar()}
                    className={` ${
                      isDark &&
                      pathname.includes(link.name) &&
                      `text-slate-100 bg-${selectedColor}`
                    } ${
                      pathname.includes(link.name) &&
                      `bg-${selectedColor} text-slate-100`
                    }  ${activeLink} ${normalLink}`}
                  >
                    <p
                      className={`${
                        isDark ? "text-slate-200" : "text-slate-700"
                      } ${
                        pathname.includes(link.name) &&
                        "text-slate-950 font-bold "
                      } flex items-center gap-3`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.name}</span>
                    </p>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
