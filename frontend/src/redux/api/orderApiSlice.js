import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create order api method
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),

    // get all orders api method
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
        method: "GET",
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    // get order by id api method
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),

    // mark order as paid api method
    markOrderAsPaid: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/${id}/pay`,
        method: "PUT",
        body: data,
      }),
    }),

    // mark order as delivered
    markOrderAsDelivred: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),

    // get all orders of user
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my-orders`,
      }),
      keepUnusedDataFor: 5,
    }),

    // get total orders count
    getTotalOrders: builder.query({
      query: () => `${ORDER_URL}/total-orders`,
    }),

    // get total orders sales
    getTotalSales: builder.query({
      query: () => `${ORDER_URL}/total-sales`,
    }),

    // get total orders sales by date
    getTotalSalesByDate: builder.query({
      query: () => `${ORDER_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useMarkOrderAsPaidMutation,
  useMarkOrderAsDelivredMutation,
  //--------------------//
  useGetMyOrdersQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
} = orderApiSlice;
