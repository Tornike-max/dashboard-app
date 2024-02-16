import { Badge, Calendar } from "antd";
import { Header } from "../components";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "Meeting with Client A" },
        { type: "success", content: "Project Deadline" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Team Standup" },
        { type: "success", content: "Submit Progress Report" },
        { type: "error", content: "Review Meeting" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "Product Demo" },
        { type: "success", content: "Team Lunch" },
        { type: "error", content: "Client Presentation" },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394; // Some arbitrary number for demonstration
  }
};

const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const dateCellRender = (value: Dayjs) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item, index) => (
        <li key={index}>
          <Badge
            status={item.type as BadgeProps["status"]}
            text={item.content}
          />
        </li>
      ))}
    </ul>
  );
};

const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
  if (info.type === "date") return dateCellRender(current);
  if (info.type === "month") return monthCellRender(current);
  return info.originNode;
};

export default function MyCalendar() {
  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-10 py-8 rounded-md">
      <Header title="Calendar" />
      <Calendar cellRender={cellRender} />
    </div>
  );
}
