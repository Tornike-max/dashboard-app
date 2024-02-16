import { BarChart } from "@mui/x-charts/BarChart";
import { Header } from "..";
import { barChartData } from "../../data/dummy";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BarChartComponent() {
  const [gold, setGold] = useState(true);
  const [bronze, setBronze] = useState(true);
  const [silver, setSilver] = useState(true);

  const dataUsa = barChartData.flatMap((country) =>
    country.filter((item) => item.x === "USA").map((item) => item.y)
  );
  const dataGbr = barChartData.flatMap((country) =>
    country.filter((item) => item.x === "GBR").map((item) => item.y)
  );
  const dataChina = barChartData.flatMap((country) =>
    country.filter((item) => item.x === "CHN").map((item) => item.y)
  );

  function handleGoldMedal() {
    if (gold === true && silver === false && bronze === false) {
      toast.error("At least one must be included");
      return;
    }
    setGold((gold) => !gold);
  }
  function handleSilverMedal() {
    if (silver === true && gold === false && bronze === false) {
      toast.error("At least one must be included");
      return;
    }
    setSilver((silver) => !silver);
  }
  function handleBronzeMedal() {
    if (bronze === true && gold === false && silver === false) {
      toast.error("At least one must be included");
      return;
    }
    setBronze((bronze) => !bronze);
  }

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-start flex-col px-6">
      <Header title="Bar Chart" />
      <div className="max-w-[1500px] w-full h-[500px] py-2 flex justify-center items-center flex-col bg-white rounded-lg">
        <div className="w-full flex justify-center items-center gap-4">
          <button
            onClick={handleGoldMedal}
            className={`py-1 px-3 rounded-md text-slate-100 hover:text-white bg-teal-500 ${
              !gold && " opacity-55"
            } `}
          >
            USA
          </button>
          <button
            onClick={handleSilverMedal}
            className={`py-1 px-3 rounded-md text-slate-100 hover:text-white bg-blue-500 ${
              !silver && " opacity-55"
            } `}
          >
            GBR
          </button>
          <button
            onClick={handleBronzeMedal}
            className={`py-1 px-3 rounded-md text-slate-100 hover:text-white bg-purple-500 ${
              !bronze && " opacity-55"
            } `}
          >
            CHN
          </button>
        </div>

        <h1 className="text-xl py-2 font-semibold">
          Olympic Medal Counts - RIO
        </h1>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Gold", "Silver", "Bronze"],
            },
          ]}
          series={[
            { data: gold ? dataUsa : [] },
            { data: silver ? dataGbr : [] },
            { data: bronze ? dataChina : [] },
          ]}
        />
      </div>
    </div>
  );
}
