import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import { Switch } from "@nextui-org/react";
import { HiOutlineCheck, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Tooltip } from "@mui/material";
import { useChangeColor } from "../contexts/useChangeColor";
import { themeColors } from "../data/dummy";

export default function ThemeSettings({
  toggleDrawer,
  state,
}: {
  toggleDrawer: (
    ecent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  state: boolean;
}) {
  const { isDark, handleToggle, changeColor, selectedColor } = useChangeColor();

  function handleChange(value: string) {
    changeColor(value);
  }

  const list = () => (
    <div
      className={`w-[250px] sm:w-[300px] md:w-[350px] lg:w-[370px] py-6 gap-4 h-full ${
        isDark && "bg-slate-800 text-slate-100"
      }`}
    >
      <Box role="presentation">
        <List>
          <ListItem disablePadding>
            <div className="w-full px-4  py-6 text-2xl flex justify-center items-start flex-col font-semibold">
              <p>Settings</p>
            </div>
          </ListItem>
        </List>
        <Divider />
        <div className="w-full px-4 text-lg flex justify-center items-start flex-col pt-12">
          <p className="font-semibold py-2">Theme Option</p>
          <div className="py-2 ">
            <Switch
              defaultSelected
              size="lg"
              color="primary"
              onChange={handleToggle}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <HiOutlineSun className={className} />
                ) : (
                  <HiOutlineMoon className={className} />
                )
              }
            >
              <span className={`${isDark && "text-slate-100"}`}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
            </Switch>
          </div>
        </div>
        <Divider />
        <p className="font-semibold pt-12 text-lg px-4 ">Theme Colors</p>

        <div className="max-w-[200px] w-full flex items-center px-2 py-4">
          {themeColors.map((value) => (
            <div className="w-full gap-1 sm:gap-2 px-2">
              <Tooltip placement="bottom" title={value.name}>
                <button
                  onClick={() => handleChange(value.color)}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-${value.color}`}
                >
                  {selectedColor === value.color && (
                    <HiOutlineCheck className="text-white" />
                  )}
                </button>
              </Tooltip>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
