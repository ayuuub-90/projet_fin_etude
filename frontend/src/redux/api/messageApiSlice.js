import { apiSlice } from "./apiSlice.js";
import { MESSAGES_URL } from "../constants.js";

const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: MESSAGES_URL,
        method: "POST",
        body: data,
      }),
    }),

    //get all messages api
    getAllMessages: builder.query({
      query: () => ({
        url: MESSAGES_URL,
      }),
    }),

    //delete message by id api
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${MESSAGES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetAllMessagesQuery,
  useDeleteMessageMutation,
} = messageApiSlice;
