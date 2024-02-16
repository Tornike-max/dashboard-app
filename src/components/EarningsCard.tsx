import { Box } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { formatCurrency } from "../ui/formatCurrency";
import { earningData } from "../data/dummy";
import SmallPieChart from "./charts/SmallPieChart";
import { useChangeColor } from "../contexts/useChangeColor";

export default function EarningsCard() {
  const { isDark, selectedColor } = useChangeColor();
  const earnChart = earningData.map((item) =>
    Number(item.amount.replace(",", ""))
  );

  const earnings = earnChart.reduce((accum, cur) => accum + cur, 0);

  return (
    <div
      className={`${
        isDark ? "bg-slate-700" : "bg-white"
      } w-full grid grid-cols-1 xl:grid-cols-1 gap-4  xl:shadow-none rounded-lg  `}
    >
      <div
        className={`w-full bg-${selectedColor} rounded-lg px-4 text-stone-100 py-6`}
      >
        <div className="w-fill flex justify-between items-start">
          <h1 className="text-xl md:text-xl font-semibold ">Earnings</h1>
          <div className="flex justify-center items-start flex-col gap-1">
            <p className="text-xl md:text-2xl font-semibold">
              {formatCurrency(earnings)}
            </p>
            <span className="text-base ">Monthly revenue</span>
          </div>
        </div>

        <div className="w-full">
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              plotType="bar"
              data={earnChart}
              height={100}
              showHighlight={true}
              showTooltip={true}
              colors={["white"]}
            />
          </Box>
        </div>
      </div>
      <SmallPieChart />
    </div>
  );
}
