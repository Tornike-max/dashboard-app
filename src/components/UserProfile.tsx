import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useStateContext } from "../contexts/useToggleSidebar";
import { Button } from "@mui/material";
import { userProfileData } from "../data/dummy";

export default function UserProfile() {
  const {
    isClicked: { userProfile },
    setIsClicked,
    anchorEl,
  } = useStateContext();
  const open = Boolean(userProfile);

  const handleClose = () => {
    setIsClicked((clicked) => {
      return { ...clicked, userProfile: false };
    });
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl as Element}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="px-4 py-2">
          <p className="flex items-center text-lg font-semibold">
            User Profile
          </p>
        </div>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Avatar />
          <div className="w-full flex justify-center items-start flex-col px-2">
            <p className="flex items-center text-base text-stone-800 font-semibold">
              Tornike
            </p>
            <p className="flex items-center text-sm text-stone-700">
              React Developer
            </p>
            <p className="flex items-center text-xs font-medium text-stone-700">
              tornike@example.com
            </p>
          </div>
        </MenuItem>
        <Divider />
        {userProfileData.map((item) => (
          <MenuItem onClick={handleClose}>
            <div className="flex items-center gap-3">
              <span
                className="p-2 rounded-xl"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              >
                {" "}
                {item.icon}
              </span>
              <div className="flex flex-col justify-center items-start">
                <span className="text-base font-medium">{item.title}</span>
                <span className="text-sm text-stone-700">{item.desc}</span>
              </div>
            </div>
          </MenuItem>
        ))}

        <div className="w-full flex justify-center items-center px-2 pt-4">
          <Button color="primary" variant="contained" className="w-full">
            LogOut
          </Button>
        </div>
      </Menu>
    </div>
  );
}
