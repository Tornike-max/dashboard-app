import { LineChart } from "@mui/x-charts/LineChart";
import { areaCustomSeries } from "../../data/dummy";
import { Header } from "..";
import { useState } from "react";

export default function AreaChart() {
  const [activeU, setActiveU] = useState(true);
  const [activeP, setActiveP] = useState(true);
  const [activeAmt, setActiveAmt] = useState(true);

  const data = areaCustomSeries.map((item) => item.dataSource);
  const uData = data[0].map((item) => item.y);
  const pData = data[1].map((item) => item.y);
  const amtData = data[2].map((item) => item.y);
  const xLabels = data[0].map((item) => item.x);

  function toggleDatas(value: string) {
    if (value === "USA") {
      setActiveU((active) => !active);
    }
    if (value === "France") {
      setActiveP((active) => !active);
    }
    if (value === "Germany") {
      setActiveAmt((active) => !active);
    }
  }

  return (
    <div className="max-w-2200px w-full flex justify-center items-center flex-col gap-2 px-6">
      <Header title="Area Chart" />

      <div
        className={`max-w-[1500px] w-full h-[500px] flex justify-center flex-col gap-4 items-center bg-white rounded-lg`}
      >
        <h1 className={`py-2  w-full text-center text-lg font-semibold`}>
          Inflation Rate in percentage
        </h1>

        <div className="w-full flex justify-center items-center gap-4 text-white">
          <button
            className={`${
              activeU ? "bg-teal-400 " : "bg-teal-200 "
            } rounded-lg py-2 px-3`}
            onClick={() => toggleDatas("USA")}
          >
            USA
          </button>
          <button
            className={` ${
              activeP ? "bg-cyan-400" : "bg-cyan-200"
            }  rounded-lg py-2 px-3`}
            onClick={() => toggleDatas("France")}
          >
            France
          </button>
          <button
            className={`${
              activeAmt ? "bg-purple-500" : "bg-purple-300"
            } rounded-lg py-2 px-3`}
            onClick={() => toggleDatas("Germany")}
          >
            Germany
          </button>
        </div>

        <LineChart
          series={[
            {
              data: activeU ? uData : [],
              label: "USA",
              area: true,
              stack: "total",
              showMark: false,
            },
            {
              data: activeP ? pData : [],
              label: "France",
              area: true,
              stack: "total",
              showMark: false,
            },
            {
              data: activeAmt ? amtData : [],
              label: "Germany",
              area: true,
              stack: "total",
              showMark: false,
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={{
            ".MuiLineElement-root": {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
}
