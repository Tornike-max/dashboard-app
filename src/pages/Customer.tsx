import { useState } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { customersData } from "../data/dummy";
import { useChangeColor } from "../contexts/useChangeColor";
import { Header } from "../components";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  CustomerID: number;
  CustomerName: string;
  CustomerEmail: string;
  CustomerImage: string;
  ProjectName: string;
  Status: string;
  StatusBg: string;
  Weeks: string;
  Budget: string;
  Location: string;
}

const data: DataType[] = customersData;

export default function Customer() {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { isDark } = useChangeColor();

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setWeekSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "Weeks",
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "CustomerName",
      key: "CustomerName",

      filteredValue: filteredInfo.CustomerName || null,
      sorter: (a, b) => a.CustomerName.length - b.CustomerName.length,
      sortOrder:
        sortedInfo.columnKey === "CustomerName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Weeks",
      dataIndex: "Weeks",
      key: "Weeks",
      sorter: (a, b) => Number(a.Weeks) - Number(b.Weeks),
      sortOrder: sortedInfo.columnKey === "Weeks" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",

      filteredValue: filteredInfo.Status || null,
      sorter: (a, b) => a.Status.length - b.Status.length,
      sortOrder: sortedInfo.columnKey === "Status" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Budget",
      dataIndex: "Budget",
      key: "Budget",

      filteredValue: filteredInfo.Budget || null,
      sorter: (a, b) => a.Budget.length - b.Budget.length,
      sortOrder: sortedInfo.columnKey === "Budget" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",

      filteredValue: filteredInfo.Location || null,
      sorter: (a, b) => a.Location.length - b.Location.length,
      sortOrder: sortedInfo.columnKey === "Location" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "CustomerID",
      dataIndex: "CustomerID",
      key: "CustomerID",

      filteredValue: filteredInfo.CustomerID || null,
      sorter: (a, b) => a.CustomerID - b.CustomerID,
      sortOrder:
        sortedInfo.columnKey === "CustomerID" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center flex-col px-6 py-4">
      <Header title="Customers" />
      <div className="max-w-[1500px] w-full flex justify-center items-center flex-col overflow-y-auto rounded-lg bg-white">
        <Space style={{ marginBottom: 16 }}>
          <Button
            className={`${isDark && "text-slate-100 border-slate-100"}`}
            onClick={setWeekSort}
          >
            Sort Week
          </Button>
          <Button
            className={`${isDark && "text-slate-100 border-slate-100"}`}
            onClick={clearAll}
          >
            Clear sorted information
          </Button>
        </Space>
        <div className="w-full">
          <Table
            scroll={{ x: true }}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
