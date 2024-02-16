import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { Header } from "../components";
import { employeesData } from "../data/dummy";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { useChangeColor } from "../contexts/useChangeColor";

export default function Employees() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("employeepage") || "1";
  const sortValue = searchParams.get("sortBy") || "employee";
  const { isDark } = useChangeColor();

  const maxItems = Math.ceil(employeesData.length / 10);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault;
    const { value } = e.currentTarget;

    searchParams.set("employeepage", value);
    setSearchParams(searchParams);
  }

  function handleNextPage() {
    if (Number(currentPage) === maxItems) return;
    searchParams.set("employeepage", String(Number(currentPage) + 1));
    setSearchParams(searchParams);
  }

  function handlePrevPage() {
    if (Number(currentPage) === 1) return;

    searchParams.set("employeepage", String(Number(currentPage) - 1));
    setSearchParams(searchParams);
  }

  function handleSort(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  const end = Number(currentPage) * 10;
  const start = Number(currentPage) === 1 ? 0 : Number(currentPage) * 10 - 10;

  const dataPages = employeesData.slice(start, end);

  const pages = Array.from({ length: 8 }, (_, i) => i);
  console.log(pages);

  let filtered;

  if (sortValue === "employee")
    filtered = dataPages.sort((a, b) => a.Name.length - b.Name.length);
  if (sortValue === "date")
    filtered = dataPages.sort((a, b) => a.HireDate.length - b.HireDate.length);
  if (sortValue === "id")
    filtered = dataPages.sort((a, b) => a.EmployeeID - b.EmployeeID);

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-10 py-10">
      <Header title="Employees" />

      <div className="w-full flex justify-center gap-2 items-center pb-4">
        <button
          onClick={() => handleSort("employee")}
          className={`${
            isDark && "text-slate-100 border-slate-100"
          } py-1 px-2 rounded-md bg-none border-2 ${
            sortValue === "employee"
              ? "bg-blue-500 text-slate-100 border-slate-100"
              : "bg-none"
          } border-blue-500 hover:bg-blue-500 hover:text-slate-100 hover:border-slate-100 duration-75 transition-all`}
        >
          Sort by Employee
        </button>
        <button
          onClick={() => handleSort("date")}
          className={`${
            isDark && "text-slate-100 border-slate-100"
          } py-1 px-2 rounded-md bg-none border-2 ${
            sortValue === "date"
              ? "bg-blue-500 text-slate-100 border-slate-100"
              : "bg-none"
          } border-blue-500 hover:bg-blue-500 hover:text-slate-100 hover:border-slate-100 duration-75 transition-all`}
        >
          Sort by Hire Date
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

      <div className="w-full overflow-x-auto">
        <table
          className={`${
            isDark && "bg-gray-50"
          } w-full table-auto  border-collapse border border-gray-200 overflow-x-auto`}
        >
          <thead>
            <tr className="bg-gray-50  text-stone-600 text-sm">
              <th className="px-3 py-1">Employee</th>
              <th className="px-3 py-1">Designation</th>
              <th className="px-3 py-1">Country</th>
              <th className="px-3 py-1">Hire Date</th>
              <th className="px-3 py-1">Reports to</th>
              <th className="px-3 py-1">Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((item, i) => (
              <tr className="text-sm" key={i}>
                <td className="border px-2 py-1 flex items-center gap-2">
                  <img
                    src={item.EmployeeImage}
                    alt="product"
                    className="h-14 w-14 hidden   lg:block rounded-full border-2 border-stone-500"
                  />
                  <span>{item.Name}</span>
                </td>
                <td className="border px-3 py-1">{item.Title}</td>
                <td className="border px-3 py-1">
                  <span> {item.Country}</span>
                </td>
                <td className="border px-3 py-1">{item.HireDate}</td>
                <td className="border px-3 py-1 ">{item.ReportsTo}</td>
                <td className="border px-3 py-1">#{item.EmployeeID}</td>
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
              {pages.slice(1).map((item) => (
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
              {currentPage} of {maxItems} pages ({employeesData.length} items)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
