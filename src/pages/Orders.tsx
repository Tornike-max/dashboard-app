import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { Header } from "../components";
import { ordersData } from "../data/dummy";
import { formatCurrency } from "../ui/formatCurrency";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useChangeColor } from "../contexts/useChangeColor";

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const sortValue = searchParams.get("sortBy") || "customerName";
  const [filterValue, setFiletValue] = useState("");
  const filterVal = searchParams.get("filter") || "none";
  const { isDark } = useChangeColor();

  const maxItems =
    filterVal === "none"
      ? ordersData.length / 10
      : ordersData?.filter((item) => item.Location === filterVal).length / 10;

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault;
    const { value } = e.currentTarget;

    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    if (Number(currentPage) === Math.ceil(maxItems)) return;
    searchParams.set("page", String(Number(currentPage) + 1));
    setSearchParams(searchParams);
  }

  function handlePrevPage() {
    if (Number(currentPage) === 1) return;

    searchParams.set("page", String(Number(currentPage) - 1));
    setSearchParams(searchParams);
  }

  function handleSort(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  function handleFilter(value: string) {
    console.log(value);
    searchParams.set("page", String(Number(1)));
    searchParams.set("filter", value);
    setSearchParams(searchParams);
    setFiletValue(value);
  }

  const end = Number(currentPage) * 10;
  const start = Number(currentPage) === 1 ? 0 : Number(currentPage) * 10 - 10;

  const demoPages =
    ordersData?.filter((item) => item.Location === filterVal).length / 10;

  const pages =
    filterVal === "none"
      ? Array.from({ length: 8 }, (_, i) => i).slice(1)
      : Array.from({ length: Math.ceil(demoPages + 1) }, (_, i) => i).slice(1);

  let filtered;

  if (sortValue === "customerName")
    filtered = ordersData
      .sort((a, b) => a.CustomerName.length - b.CustomerName.length)
      .slice(start, end);

  if (sortValue === "amount")
    filtered = ordersData
      .sort((a, b) => a.TotalAmount - b.TotalAmount)
      .slice(start, end);

  if (sortValue === "id")
    filtered = ordersData
      .sort((a, b) => a.OrderID - b.OrderID)
      .slice(start, end);

  if (filterVal === "none") filtered = ordersData.slice(start, end);

  if (filterVal !== "none")
    filtered = ordersData
      .filter((value) => value.Location === filterVal)
      .slice(start, end);

  const places = ordersData.map((place) => place.Location);
  const uniqueLocation = Array.from(new Set(places));

  console.log(filtered);

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-10 py-10">
      <Header title="Orders" />

      <div className="w-full flex justify-center flex-col gap-2 items-center pb-4">
        <div className="w-full flex justify-center gap-2 items-center">
          <button
            onClick={() => handleSort("customerName")}
            className={`${
              isDark && "text-slate-100 border-slate-100"
            } py-1 px-2 rounded-md bg-none border-2 ${
              sortValue === "customerName"
                ? "bg-blue-500 text-slate-100 border-slate-100"
                : "bg-none"
            } border-blue-500 hover:bg-blue-500 hover:text-slate-100 hover:border-slate-100 duration-75 transition-all`}
          >
            Sort by Name
          </button>
          <button
            onClick={() => handleSort("amount")}
            className={`${
              isDark && "text-slate-100 border-slate-100"
            } py-1 px-2 rounded-md bg-none border-2 ${
              sortValue === "amount"
                ? "bg-blue-500 text-slate-100 border-slate-100"
                : "bg-none"
            } border-blue-500 hover:bg-blue-500 hover:text-slate-100 hover:border-slate-100 duration-75 transition-all`}
          >
            Sort by amount
          </button>
          <button
            onClick={() => handleSort("id")}
            className={`${
              isDark && "text-slate-100 border-slate-100"
            } py-1 px-2 rounded-md bg-none border-2 ${
              sortValue === "id"
                ? "bg-blue-500 text-slate-100 border-slate-100"
                : "bg-none"
            } border-blue-500 hover:bg-blue-500 hover:text-slate-100 hover:border-slate-100 duration-75 transition-all`}
          >
            Sort by Id
          </button>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <select
            value={filterValue}
            onChange={(e) => handleFilter(e.target.value)}
            className="py-1 px-3 w-full border-2 rounded-lg border-blue-500"
          >
            <option value="none">None</option>
            {uniqueLocation?.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table
          className={`${
            isDark && "bg-gray-50"
          } w-full table-auto border-collapse border border-gray-200 overflow-x-auto`}
        >
          <thead>
            <tr className="bg-gray-50 text-stone-600 text-sm">
              <th className="px-3 py-1">Image</th>
              <th className="px-3 py-1">Item</th>
              <th className="px-3 py-1">Customer Name</th>
              <th className="px-3 py-1">Total Amount</th>
              <th className="px-3 py-1">Status</th>
              <th className="px-3 py-1">Order Id</th>
              <th className="px-3 py-1">Location</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered?.map((item, i) => (
              <tr key={i}>
                <td className="border px-3 py-1">
                  <img
                    src={item.ProductImage}
                    alt="product"
                    className="h-14 w-14 rounded-full border-2 border-stone-500"
                  />
                </td>
                <td className="border px-3 py-1">{item.OrderItems}</td>
                <td className="border px-3 py-1">{item.CustomerName}</td>
                <td className="border px-3 py-1">
                  {formatCurrency(item.TotalAmount)}
                </td>
                <td className="border px-3 py-1 ">
                  <span
                    style={{
                      backgroundColor:
                        item.Status === "pending"
                          ? "#FB9678"
                          : item.Status === "active"
                          ? "#03C9D7"
                          : item.Status === "rejected"
                          ? "red"
                          : item.Status === "canceled"
                          ? "#FF5C8E"
                          : "#8BE78B",
                    }}
                    className={`text-stone-100 rounded-xl py-2 px-4`}
                  >
                    {item.Status}
                  </span>
                </td>
                <td className="border px-3 py-1">#{item.OrderID}</td>
                <td className="border px-3 py-1">{item.Location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-stone-100 border-[1px] border-stone-200 gap-4 py-2 px-6">
          <div className="w-full flex justify-center sm:justify-start items-center gap-2 sm:gap-3 md:gap-4">
            <button
              disabled={Number(currentPage) === 1}
              onClick={() => handlePrevPage()}
              className={`text-2xl font-semibold  ${
                Number(currentPage) === 1
                  ? "text-stone-600 opacity-70"
                  : "text-stone-900 hover:bg-stone-300"
              } py-1 px-4 bg-none  border-2  border-stone-400 rounded-lg`}
            >
              <HiOutlineArrowLeft />
            </button>
            <div className="hidden sm:flex justify-center items-center gap-4">
              {pages.map((item) => (
                <button
                  key={item}
                  value={item}
                  onClick={(e) => handleClick(e)}
                  className={`w-6 h-6 text-sm hover:bg-blue-500 hover:text-stone-100 ${
                    item === Number(currentPage) && "bg-blue-500 text-stone-100"
                  } rounded-full`}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="sm:hidden">{currentPage}</span>
            <button
              disabled={Number(currentPage) === maxItems}
              onClick={() => handleNextPage()}
              className={`text-2xl font-semibold  ${
                Number(currentPage) === maxItems
                  ? "text-stone-600 opacity-70"
                  : "text-stone-900 hover:bg-stone-300"
              } py-1 px-4 bg-none  border-2  border-stone-400 rounded-lg`}
            >
              <HiOutlineArrowRight />
            </button>
          </div>
          <div className="w-full flex justify-center sm:justify-end items-center">
            <span className="text-sm">
              {currentPage} of {pages.length} pages (
              {filterVal === "none"
                ? ordersData.length
                : ordersData.filter((item) => item.Location === filterVal)
                    .length}{" "}
              items)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
