import { useChangeColor } from "../../contexts/useChangeColor";
import { ecomPieChartData } from "../../data/dummy";
import { PieChart } from "@mui/x-charts/PieChart";

export default function SmallPieChart() {
  const { isDark } = useChangeColor();
  const data = ecomPieChartData;

  return (
    <div
      className={`${
        isDark ? "bg-slate-700 text-slate-100" : "bg-white"
      } w-full flex flex-col justify-center items-center shadow-md rounded-lg`}
    >
      <h1 className="text-lg font-semibold">Sales</h1>
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            arcLabel: (item) => `${item.label} `,
            paddingAngle: 2,
            cornerRadius: 5,
          },
        ]}
        height={200}
      />
    </div>
  );
}
