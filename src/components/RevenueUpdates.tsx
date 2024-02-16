import { Chip } from "@mui/material";
import { formatCurrency } from "../ui/formatCurrency";
import { SparkLine, Stacked } from ".";
import EarningsCard from "./EarningsCard";
import { useChangeColor } from "../contexts/useChangeColor";

export default function RevenueUpdates() {
  const { isDark } = useChangeColor();

  return (
    <div className="w-full flex justify-center items-center flex-col  h-full mx-4 rounded-lg my-4">
      <div className="max-w-[2200px] w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 py-4 px-4">
        <div
          className={`w-full flex flex-col justify-center items-center ${
            isDark ? "bg-slate-700 text-slate-100" : "bg-white"
          }   p-4 rounded-lg shadow-md`}
        >
          <h1 className="font-semibold text-lg md:text-xl mb-4">
            Revenue Updates
          </h1>
          <div className="flex flex-col items-start gap-4">
            <div className="flex justify-between w-full gap-2">
              <div className="flex flex-col justify-center items-start">
                <p className="text-lg font-bold">{formatCurrency(93438)}</p>
                <span
                  className={`text-xs font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  } text-slate-500`}
                >
                  Budget
                </span>
              </div>
              <Chip label="23%" size="small" color="success" />
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center items-start">
                <p className="text-lg font-bold">{formatCurrency(48487)}</p>
                <span
                  className={`text-xs font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-500"
                  } `}
                >
                  Expense
                </span>
              </div>
            </div>
          </div>
          <SparkLine />
        </div>
        <div
          className={`w-full flex flex-col justify-center items-center p-4 rounded-lg shadow-md ${
            isDark ? "bg-slate-700" : "bg-white"
          } `}
        >
          <Stacked />
        </div>
        <div
          className={`hidden xl:flex w-full flex-col justify-center items-center p-4 rounded-lg shadow-md ${
            isDark ? "bg-slate-700" : "bg-white"
          }`}
        >
          <EarningsCard />
        </div>
      </div>
    </div>
  );
}
