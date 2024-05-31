import Chart from "react-apexcharts";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice.js";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice.js";

import { useState, useEffect } from "react";
import OrderList from "./OrderList";

const DashBoard = () => {
  const { data: sales } = useGetTotalSalesQuery();
  const { data: customers } = useGetAllUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
      <section className="h-[570px] overflow-hidden overflow-y-auto">
        <div className="w-full flex justify-around">
          <div className="rounded-lg bg-gray-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#00E396] text-center p-3">
              $
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-gray-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#00E396] text-center p-3">
              $
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">{customers?.length}</h1>
          </div>
          <div className="rounded-lg bg-gray-100 p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-[#00E396] text-center p-3">
              $
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">{orders?.totalOrders}</h1>
          </div>
        </div>

        <div className="mt-10 ml-10 ">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="90%"
          />
        </div>

        <div className="mt-[4rem] mx-2">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default DashBoard;
