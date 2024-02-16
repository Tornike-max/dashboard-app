import { Tooltip } from "@mui/material";
import { useChangeColor } from "../contexts/useChangeColor";

export const NavButton = ({
  title,
  customFunc,
  icon,
  dotColor,
}: {
  title: string;
  customFunc: (e: React.MouseEvent) => void;
  icon: React.ReactNode;
  dotColor: string;
}) => {
  const { selectedColor } = useChangeColor();
  return (
    <Tooltip title={title} placement="bottom">
      <button
        type="button"
        onClick={(e) => customFunc(e)}
        // style={{ color }}
        className={`relative text-lg sm:text-xl text-${selectedColor} rounded-full p-2 sm:p-3 hover:bg-light-gray`}
      >
        <span
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
          style={{ backgroundColor: dotColor ? dotColor : "" }}
        />
        {icon}
      </button>
    </Tooltip>
  );
};
