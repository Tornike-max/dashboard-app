import { LineChart } from "@mui/x-charts/LineChart";
import { lineCustomSeries } from "../../data/dummy";
import { useChangeColor } from "../../contexts/useChangeColor";
import { useLocation } from "react-router-dom";

export default function LineCharts() {
  const { isDark } = useChangeColor();
  const { pathname } = useLocation();
  const data = lineCustomSeries;
  const ukData = data.map((item) => item.dataSource.map((dta) => dta.y));
  const xLabels = data.map((date) => date.dataSource.map((item) => item.x));

  return (
    <div
      className={` max-w-[1500px] w-full h-[515px] shadow-md ${
        isDark && pathname === "/ecommerce"
          ? "bg-slate-700"
          : isDark && pathname === "/line"
          ? "bg-white"
          : "bg-white"
      }  rounded-md px-4 flex justify-center flex-col items-center py-2`}
    >
      <h1 className="text-lg sm:text-xl">Inflation Rate</h1>
      <LineChart
        series={[
          { data: ukData[0], label: "Germany" },
          { data: ukData[1], label: "England" },
          { data: ukData[2], label: "India" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels[0] }]}
      />
    </div>
  );
}
