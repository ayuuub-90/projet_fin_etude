import { apiSlice } from "./apiSlice.js";
import { PUBS_URL } from "../constants.js";

export const pubApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //create pub api
    createPub: builder.mutation({
      query: (data) => ({
        url: PUBS_URL,
        method: "POST",
        body: data,
      }),
    }),

    //update pub api
    editPub: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PUBS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    //delete pub api
    deletePub: builder.mutation({
      query: (id) => ({
        url: `${PUBS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    //get all pubs api
    getAllPub: builder.query({
      query: () => ({
        url: `${PUBS_URL}`,
      }),
    }),

    //get pub by id api
    getPubById: builder.query({
      query: (id) => ({
        url: `${PUBS_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreatePubMutation,
  useEditPubMutation,
  useDeletePubMutation,
  useGetAllPubQuery,
  useGetPubByIdQuery,
} = pubApiSlice;
