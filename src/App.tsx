// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { FiSettings } from "react-icons/fi";

import { Navbar, Sidebar, ThemeSettings } from "./components";

import "./App.css";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Editor,
} from "./pages";
import { useStateContext } from "./contexts/useToggleSidebar";
import ClrPicker from "./pages/ColorPicker";
import { useChangeColor } from "./contexts/useChangeColor";

export default function App() {
  const { isActive: activeMenu } = useStateContext();
  const { toggleDrawer, state, isDark, selectedColor } = useChangeColor();
  return (
    <div
      className={`max-w-[2200px] w-full h-full ${
        isDark ? "bg-slate-800" : "bg-stone-100"
      } `}
    >
      <BrowserRouter>
        <div className="flex w-full relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <Tooltip title="Settings" placement="top-start">
              <button
                onClick={(e) => toggleDrawer(e)}
                className={`rounded-full p-2 text-slate-100 bg-${selectedColor}`}
              >
                <FiSettings className="text-3xl" />
              </button>
            </Tooltip>
            {state && (
              <ThemeSettings toggleDrawer={toggleDrawer} state={state} />
            )}
          </div>
          {activeMenu ? (
            <div
              className={`max-w-72 w-full fixed sidebar dark:bg-secondary-dark-bg ${
                isDark ? "bg-slate-800" : "bg-white"
              }`}
            >
              <Sidebar />
            </div>
          ) : null}{" "}
          <div
            className={`w-full dark:bg-main-bg bg-main-bg min-h-screen ${
              activeMenu ? "md:ml-72" : "md:ml-0"
            }`}
          >
            <div
              className={`w-full ${
                isDark ? "bg-slate-800" : "bg-white"
              } sticky z-50 top-0 left-0 right-0 flex justify-center items-center px-4`}
            >
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ClrPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
