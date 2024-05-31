import { apiSlice } from "./apiSlice.js";
import { BRANDS_URL } from "../constants.js";

const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //creat a new brand api
    createBrand: builder.mutation({
      query: (data) => ({
        url: `${BRANDS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    //update brand by id api
    updateBrand: builder.mutation({
      query: ({ id, updatedBrand }) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "PUT",
        body: updatedBrand,
      }),
    }),

    //delete brand by id api
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    //get all brands api
    getAllBrands: builder.query({
      query: () => ({
        url: `${BRANDS_URL}`,
      }),
    }),

    //get specified brand by ID
    getBrandById: builder.query({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
} = brandApiSlice;
