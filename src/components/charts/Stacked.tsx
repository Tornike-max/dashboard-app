import { BarChart } from "@mui/x-charts/BarChart";
import { stackedChartData } from "../../data/dummy";
import { BsBarChart } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Stacked() {
  const [isExpenceOpen, setIsExpenceOpen] = useState(true);
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);

  const budget = stackedChartData.map((exp) => exp.map((item) => item.y));
  const months = stackedChartData.map((month) => month.map((item) => item.x));

  function handleToggleBudget() {
    if (isExpenceOpen === false) {
      toast.error("You cannot hide both budget and expense data together!");
      return;
    }
    setIsBudgetOpen((open) => !open);
  }

  function handleToggleExpence() {
    if (isBudgetOpen === false) {
      toast.error("You cannot hide both budget and expense data together!");
      return;
    }
    setIsExpenceOpen((open) => !open);
  }

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg flex-col  m-auto ">
      {/* Ensure that the following div is centered */}
      <div className="max-w-[800px] w-full h-[360px] flex flex-grow justify-center items-center">
        <BarChart
          xAxis={[{ scaleType: "band", dataKey: "x", data: months[0] }]}
          series={[
            {
              data: isExpenceOpen ? budget[0] : [],
              label: "Budget",
              stack: "total",
            },
            {
              data: isBudgetOpen ? budget[1] : [],
              label: "Expense",
              stack: "total",
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-6">
        <button
          onClick={() => handleToggleBudget()}
          className={`flex  items-center gap-1 ${
            isBudgetOpen
              ? "text-green-600 font-semibold"
              : "opacity-80 text-green-400"
          } `}
        >
          <BsBarChart />
          <span>Budget</span>
        </button>
        <button
          onClick={() => handleToggleExpence()}
          className={`flex  items-center gap-1 ${
            isExpenceOpen
              ? "text-blue-600 font-semibold"
              : "opacity-80 text-blue-400"
          } `}
        >
          <BsBarChart />
          <span>Expence</span>
        </button>
      </div>
    </div>
  );
}
