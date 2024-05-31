import { apiSlice } from "./apiSlice.js";
import { CATEGORIES_URL } from "../constants.js";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //creat a new category api
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    //update category by id api
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),

    //delete category by id api
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    //get all categories api
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
      }),
    }),

    //get specified category by ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApiSlice;
