import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //register user api
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    //login user api
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    //logout user api
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    //get all users api
    getAllUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    //get current user profile api
    currentUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),

    //update current user api
    updateCurrentUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    //add shipping info to current user
    addShippingAddress: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "POST",
        body: data,
      }),
    }),

    //get user by id Api
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),

    //update user by id Api
    updateUserById: builder.mutation({
      query: ({ data, id }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    //delete user by id api
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    // change current password user api
    changeCurrentPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetAllUsersQuery,
  useCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useAddShippingAddressMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserMutation,
  useChangeCurrentPasswordMutation,
} = userApiSlice;
