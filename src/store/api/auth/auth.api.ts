
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  email: string;
  password: string;
}



interface ResetPasswordUpdate {
  email: string;
  otp: string;
  confirmPassword: string;
}

interface ResetPasswordEmail {
  email: string;
}


const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts`;

export const authApi = createApi({
  reducerPath: 'authApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    signIn: builder.mutation<any, User>({
      query: (data) => ({
        url: `${baseURL}/sign-in`,
        method: 'POST',
        body: {
          ...data,
          phoneNumber: "string",
          type: "string"
        },
      }),
    }),

    updatePassword: builder.mutation<any, ResetPasswordEmail>({
      query: (data) => ({
        url: `${baseURL}/update-password`,
        method: 'POST',
        body: data,
      }),
    }),

    profile: builder.mutation<any, ResetPasswordUpdate>({
      query: (data) => ({
        url: `${baseURL}/me`,
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useUpdatePasswordMutation,
  useProfileMutation,
} = authApi;
