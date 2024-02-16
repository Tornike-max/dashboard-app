import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { earningData } from "../data/dummy";
import { formatCurrency } from "../ui/formatCurrency";
import RevenueUpdates from "../components/RevenueUpdates";
import EarningsCard from "../components/EarningsCard";
import RecentTransactions from "../components/RecentTransactions";
import LineCharts from "../components/charts/LineChart";
import { useChangeColor } from "../contexts/useChangeColor";

export default function Ecommerce() {
  const { isDark, selectedColor } = useChangeColor();
  const totalEarning = earningData
    .map((item) => Number(item.amount.replace(",", "")))
    .reduce((accum, cur) => accum + cur, 0);

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col">
      <div className="w-full my-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-4">
        <div
          className={`flex-1 ${
            isDark
              ? "bg-slate-700 text-slate-100"
              : "bg-slate-200 text-slate-600"
          } py-2 px-4 rounded-lg flex flex-col justify-center items-start gap-4 hover:shadow-xl duration-200 transition-all`}
        >
          <div className="flex justify-between items-center w-full gap-4">
            <div className="w-full flex items-start justify-center flex-col">
              <span className="text-xs  font-semibold">Earnings</span>
              <p className="text-base font-bold">
                {formatCurrency(totalEarning)}
              </p>
            </div>
            <div
              className={`p-2 rounded-full flex justify-center items-center bg-${selectedColor} opacity-70`}
            >
              <HiOutlineCurrencyDollar className="text-slate-100" />
            </div>
          </div>
          <button
            className={`py-2 px-3 rounded-lg text-slate-100 hover:text-white bg-${selectedColor}`}
          >
            Download
          </button>
        </div>
        {earningData.map((item, index) => (
          <div
            key={index}
            className={`flex-1  ${
              isDark
                ? "bg-slate-700 text-slate-100"
                : "bg-slate-200 text-slate-600"
            } py-2 px-4 rounded-lg flex flex-col justify-center items-start hover:shadow-xl duration-200 transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start justify-center gap-1">
                <div
                  className="p-2 rounded-full flex justify-center items-center"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <span style={{ color: item.iconColor }}>{item.icon}</span>
                </div>
                <p className="flex items-center gap-1">
                  <span className="text-base font-semibold ">
                    {item.amount}
                  </span>
                  <span
                    className={`text-[10px] ${
                      item.percentage.includes("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.percentage}
                  </span>
                </p>
                <span className="font-semibold  text-[10px]">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-2 my-4">
        <RevenueUpdates />
        <div
          className={`w-full flex flex-col justify-center items-center xl:hidden  p-4 rounded-lg ${
            isDark ? "bg-slate-700" : "bg-white"
          } `}
        >
          <EarningsCard />
        </div>
      </div>

      <div className="w-full flex justify-between items-center flex-col lg:flex-row  px-4 gap-6 rounded-xl my-4">
        <LineCharts />
        <RecentTransactions />
      </div>
    </div>
  );
}
