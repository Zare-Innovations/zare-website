import { baseQuery } from '@/store/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface Job {
  title: string;
  yearsOfExperience: number;
  location: string;
  type: 'Remote'| 'On-site'| 'Hybrid';
  workType: string;
  skills: string;
  startDate: string;  
  endDate: string;  
  description: string;
}


const baseURL = '/job';

export const jobApi = createApi({
  reducerPath: 'jobApi',
  baseQuery: baseQuery,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    createJob: builder.mutation<any, Job>({
      query: (data) => ({
        url: `${baseURL}`,
        method: 'POST',
        body: data,
      }),
    }),

    updateJob: builder.mutation<any, Job>({
      query: (data) => ({
        url: `${baseURL}/update-password`,
        method: 'PUT',
        body: data,
      }),
    }),

    getJob: builder.query<Job, void>({
      query: () => ({
        url: `${baseURL}/me`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetJobQuery,
} = jobApi;

