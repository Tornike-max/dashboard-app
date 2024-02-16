import { useChangeColor } from "../contexts/useChangeColor";
import { recentTransactions } from "../data/dummy";

export default function RecentTransactions() {
  const { isDark } = useChangeColor();
  function handleSelect(value: string) {
    console.log(value);
  }

  console.log(recentTransactions);
  return (
    <div
      className={`max-w-[2200px]  w-full flex justify-center items-center flex-col py-4 px-8 shadow-md rounded-lg ${
        isDark ? "bg-slate-700 text-slate-100" : "bg-white"
      } `}
    >
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl xl:text-2xl font-semibold">
          Recent Transactions
        </h2>
        <select
          onChange={(e) => handleSelect(e.target.value)}
          className="py-2 px-3 rounded-md border-2 border-stone-500"
        >
          <option value="today">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>
      <ul className="w-full flex justify-center items-center flex-col gap-4 ">
        {recentTransactions.map((item) => (
          <li
            key={item.title}
            className="flex w-full justify-between items-center border-b-[1px] border-stone-500 py-3"
          >
            <div className="w-full flex justify-start items-center gap-4">
              <span
                className={`text-3xl p-2 bg-${item.pcColor} rounded-xl`}
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              >
                {item.icon}
              </span>
              <div className="max-w-[120px] w-full flex flex-col items-start justify-center gap-1">
                <span className="text-base font-semibold">{item.title}</span>
                <span className="text-xs font-semibold">{item.desc}</span>
              </div>
            </div>
            <span
              className={`${
                item.amount.includes("-") ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
