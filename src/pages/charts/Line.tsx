import { Header } from "../../components";
import LineCharts from "../../components/charts/LineChart";

export default function Line() {
  return (
    <div className="max-w-[2200px] w-full flex flex-col justify-center items-center px-6">
      <div className="w-full flex justify-start items-center">
        <Header title="Line Chart" />
      </div>
      <LineCharts />
    </div>
  );
}
