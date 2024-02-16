import { BarChart } from "@mui/x-charts/BarChart";
import { Header } from "../../components";
import { colorMappingData } from "../../data/dummy";
import { useChangeColor } from "../../contexts/useChangeColor";

export default function Stacked() {
  const { isDark } = useChangeColor();
  const chartSetting = {
    xAxis: [
      {
        label: "Average Temperature in USA",
      },
    ],
  };
  const data = colorMappingData.map((items) =>
    items.map((item) => {
      return {
        month: item.x,
        value: item.y,
      };
    })
  )[0];

  const valueFormatter = (value: number) => `${value}°C`;

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col py-4 px-6">
      <Header title="Bar Chart" />
      <div className="w-full flex justify-center items-center">
        <h1
          className={`py-2 ${
            isDark && "text-slate-100 "
          } text-base sm:text-xl font-semibold`}
        >
          USA CLIMATE - WEATHER BY MONTH
        </h1>
      </div>
      <div className="max-w-[1500px] w-full h-[500px] flex justify-center items-center py-4 bg-white rounded-lg">
        <BarChart
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: "value",
              label: "Temperature",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
        />
      </div>
    </div>
  );
}
