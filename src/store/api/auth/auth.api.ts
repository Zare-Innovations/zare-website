
import { baseQuery } from '@/store/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

interface User {
  email: string;
  password: string;
}

interface Profile{
email:string
id:string
name:string 

}


// interface ResetPasswordUpdate {
//   email: string;
//   otp: string;
//   confirmPassword: string;
// }

interface ResetPasswordEmail {
  email: string;
}


const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/accounts`;

export const authApi = createApi({
  reducerPath: 'authApi',
  refetchOnFocus: true,
  baseQuery: baseQuery,
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

 profile: builder.query<Profile, void>({
  query: () => ({
    url: `${baseURL}/me`,
    method: 'GET',
  }),
}),

  }),
});

export const {
  useSignInMutation,
  useUpdatePasswordMutation,
  useProfileQuery,
} = authApi;
