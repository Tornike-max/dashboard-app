import { Button } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { SparklineAreaData } from "../../data/dummy";

export default function SparkLine() {
  const newData = SparklineAreaData.map((spark) => spark.yval);
  return (
    <div className=" w-full  flex justify-center items-center flex-col gap-4">
      <div className="max-w-[800px] w-full h-[200px] flex justify-center items-center">
        <SparkLineChart
          data={newData}
          showHighlight={true}
          showTooltip={true}
        />
      </div>

      <Button variant="contained" color="primary">
        Download Report
      </Button>
    </div>
  );
}
