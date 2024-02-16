import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useStateContext } from "../contexts/useToggleSidebar";
import { Button } from "@mui/material";

export default function Chat() {
  const {
    isClicked: { chat },
    setIsClicked,
    anchorEl,
  } = useStateContext();
  const open = Boolean(chat);

  const handleClose = () => {
    setIsClicked((clicked) => {
      return { ...clicked, chat: false };
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
        <MenuItem onClick={handleClose}>
          <p className="flex items-center text-lg font-semibold">Chat</p>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <div className="flex items-center gap-3">
            <Avatar />
            <div className="flex flex-col justify-center items-start">
              <span className="text-base font-semibold">
                Roman Joined the Team!
              </span>
              <span className="text-sm text-stone-700">Congratulate him</span>
              <span className="text-xs text-stone-700">9:08 AM</span>
            </div>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="flex items-center gap-3">
            <Avatar />
            <div className="flex flex-col justify-center items-start">
              <span className="text-base font-semibold">
                New message received!
              </span>
              <span className="text-sm text-stone-700">
                Salma sent you new message
              </span>
              <span className="text-xs text-stone-700">11:56 AM</span>
            </div>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="flex items-center gap-3">
            <Avatar />
            <div className="flex flex-col justify-center items-start">
              <span className="text-base font-semibold">
                New Payment received
              </span>
              <span className="text-sm text-stone-700">
                Check your earnings
              </span>
              <span className="text-xs text-stone-700">4:39 AM</span>
            </div>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className="flex items-center gap-3">
            <Avatar />
            <div className="flex flex-col justify-center items-start">
              <span className="text-base font-semibold">
                Jolly completed tasks
              </span>
              <span className="text-sm text-stone-700">
                Assign her new tasks
              </span>
              <span className="text-xs text-stone-700">1:12 AM</span>
            </div>
          </div>
        </MenuItem>
        <div className="w-full flex justify-center items-center px-2 pt-4">
          <Button color="primary" variant="contained" className="w-full">
            See All Messages
          </Button>
        </div>
      </Menu>
    </div>
  );
}
