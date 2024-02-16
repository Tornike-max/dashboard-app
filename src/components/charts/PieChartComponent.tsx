import { PieChart } from "@mui/x-charts/PieChart";
import { Header } from "..";
import { useState } from "react";
import { useStateContext } from "../../contexts/useToggleSidebar";

export default function PieChartComponent() {
  const { screenSize } = useStateContext();
  const [labour, setLabour] = useState(true);
  const [legal, setLegal] = useState(true);
  const [production, setProduction] = useState(true);
  const [license, setLicense] = useState(true);
  const [facilities, setFacilities] = useState(true);
  const [taxes, setTaxes] = useState(true);
  const [insurance, setInsurance] = useState(true);

  const booleans = [
    labour,
    legal,
    production,
    license,
    facilities,
    taxes,
    insurance,
  ];
  console.log(screenSize);

  function toggle(value: string) {
    const trueCount = booleans.filter((val) => val).length;

    if (value === "labour") {
      if (trueCount === 1 && labour) {
        return;
      }
      setLabour((labour) => !labour);
    }
    if (value === "production") {
      if (trueCount === 1 && production) {
        return;
      }
      setProduction((production) => !production);
    }
    if (value === "license") {
      if (trueCount === 1 && license) {
        return;
      }
      setLicense((license) => !license);
    }
    if (value === "facilities") {
      if (trueCount === 1 && facilities) {
        return;
      }
      setFacilities((facilities) => !facilities);
    }
    if (value === "taxes") {
      if (trueCount === 1 && taxes) {
        return;
      }
      setTaxes((taxes) => !taxes);
    }
    if (value === "insurance") {
      if (trueCount === 1 && insurance) {
        return;
      }
      setInsurance((insurance) => !insurance);
    }
    if (value === "legal") {
      if (trueCount === 1 && legal) {
        return;
      }
      setLegal((legal) => !legal);
    }
  }
  const buttons = [
    {
      color: "teal-500",
      hoverColor: "teal-400",
      value: "labour",
      data: labour,
    },
    {
      color: "blue-500",
      hoverColor: "blue-400",
      value: "legal",
      data: legal,
    },
    {
      color: "purple-500",
      hoverColor: "purple-400",
      value: "production",
      data: production,
    },
    {
      color: "purple-700",
      hoverColor: "purple-800",
      value: "license",
      data: license,
    },
    {
      color: "blue-600",
      hoverColor: "blue-700",
      value: "facilities",
      data: facilities,
    },
    {
      color: "blue-800",
      hoverColor: "blue-900",
      value: "taxes",
      data: taxes,
    },
    {
      color: "teal-400",
      hoverColor: "teal-500",
      value: "insurance",
      data: insurance,
    },
  ];
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-6 gap-4">
      <Header title="Pie Chart" />
      <div className="max-w-[1500px] h-[450px] md:h-[500px] w-full flex justify-center flex-col items-center bg-white rounded-lg py-8">
        <div className="w-full flex justify-center items-center flex-col gap-4 py-2">
          <div className="max-w-[500px] w-full flex justify-center items-center flex-wrap gap-2">
            {buttons.map((val) => (
              <button
                key={val.value}
                onClick={() => toggle(val.value)}
                className={`py-1 px-3 rounded-md bg-${
                  val.color
                } hover:shadow-lg hover:bg-${val.hoverColor} ${
                  !val.data && "opacity-60"
                } duration-100 transition-all text-slate-100 `}
              >
                Labour
              </button>
            ))}
          </div>
          <h1 className="text-xl font-semibold">Project Cost Breakdown</h1>
        </div>
        <PieChart
          slotProps={{
            legend: { hidden: screenSize && screenSize < 500 ? true : false },
          }}
          series={[
            {
              data: [
                {
                  label: labour ? "Labour" : "",
                  id: labour ? 17 : 0,
                  value: labour ? 17 : 0,
                },
                {
                  label: legal ? "Legal" : "",
                  id: legal ? 8 : 0,
                  value: legal ? 8 : 0,
                },
                {
                  label: production ? "Production" : "",
                  id: production ? 15 : 0,
                  value: production ? 15 : 0,
                },
                {
                  label: license ? "License" : "",
                  id: license ? 11 : 0,
                  value: license ? 11 : 0,
                },
                {
                  label: facilities ? "Facilities" : "",
                  id: facilities ? 19 : 0,
                  value: facilities ? 19 : 0,
                },
                {
                  label: taxes ? "Taxes" : "",
                  id: taxes ? 14 : 0,
                  value: taxes ? 14 : 0,
                },
                {
                  label: insurance ? "Insurance" : "",
                  id: insurance ? 16 : 0,
                  value: insurance ? 16 : 0,
                },
              ].filter((item) => item.value !== 0),
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 20, additionalRadius: -10, color: "gray" },
              arcLabel: (item) => `${item.formattedValue}%`,
              paddingAngle: 3,
              cornerRadius: 20,
            },
          ]}
        />
      </div>
    </div>
  );
}
