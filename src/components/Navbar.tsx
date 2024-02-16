// Navbar.js
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/useToggleSidebar";
import { Tooltip } from "@mui/material";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import { useEffect } from "react";
import { NavButton } from "../ui/NavButton";
import { useChangeColor } from "../contexts/useChangeColor";

export default function Navbar() {
  const { setIsActive, isClicked, handleClick, screenSize, setScreenSize } =
    useStateContext();
  const { isDark } = useChangeColor();

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize !== null && screenSize <= 900) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [screenSize, setIsActive]);

  return (
    <div
      className={`w-full flex justify-between p-2 md:mx-2 relative ${
        isDark ? "bg-slate-800" : "bg-white"
      }`}
    >
      <div className="w-full flex justify-start items-center">
        <NavButton
          title="Menu"
          customFunc={() => setIsActive((prev) => !prev)}
          icon={<AiOutlineMenu />}
          dotColor=""
        />
      </div>
      <div className="w-full flex justify-end items-center">
        <NavButton
          title="Cart"
          customFunc={(e) => handleClick(e, "cart")}
          icon={<HiOutlineShoppingCart />}
          dotColor=""
        />
        <NavButton
          title="Chat"
          customFunc={(e) => handleClick(e, "chat")}
          icon={<BsChatLeft />}
          dotColor="#03C9D7"
        />
        <NavButton
          title="Notification"
          customFunc={(e) => handleClick(e, "notification")}
          icon={<RiNotification3Line />}
          dotColor="yellow"
        />
        <Tooltip placement="bottom" title="Profile">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={(e) => handleClick(e, "userProfile")}
          >
            <img
              src={avatar}
              alt="user-avatar"
              className="rounded-full w-8 h-8"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Tornike
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>
      </div>
      {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.notification && <Notification />}
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
}
