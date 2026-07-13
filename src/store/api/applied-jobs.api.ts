import { CollectionQuery } from '@/app/core-fe/models/query';
import { encodeCollectionQuery } from '@/app/utility/query-builder';
import { baseQuery } from '@/store/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export type AppliedJobStatus =
  | 'Pending'
  | 'Shortlisted'
  | 'Rejected'
  | 'Hired'
  | string;

export interface AppliedJob {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume?: string;
  status: AppliedJobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppliedJob {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume?: string;
  status: AppliedJobStatus;
}

export interface AppliedJobListResponse {
  total: number;
  items: AppliedJob[];
}

const baseURL = '/applied-jobs';

export const appliedJobsApi = createApi({
  reducerPath: 'appliedJobsApi',
  baseQuery: baseQuery,
  refetchOnFocus: true,
  tagTypes: ['AppliedJob'],
  endpoints: (builder) => ({
    getAppliedJobs: builder.query<AppliedJobListResponse, CollectionQuery | undefined>({
      query: (collectionQuery) => {
        let q = '';
        if (collectionQuery) {
          const encoded = encodeCollectionQuery(collectionQuery);
          q = `?q=${encoded}`;
        }
        return { url: `${baseURL}/all${q}`, method: 'GET' };
      },
      providesTags: ['AppliedJob'],
    }),

    getAppliedJob: builder.query<AppliedJob, string>({
      query: (id) => ({ url: `${baseURL}/${id}`, method: 'GET' }),
      providesTags: ['AppliedJob'],
    }),

    updateAppliedJob: builder.mutation<
      AppliedJob,
      { id: string; data: Partial<CreateAppliedJob> }
    >({
      query: ({ id, data }) => ({
        url: `${baseURL}/${id}`,
        method: 'PUT',
        body: { ...data, id },
      }),
      invalidatesTags: ['AppliedJob'],
    }),

    deleteAppliedJob: builder.mutation<AppliedJob, { id: string }>({
      query: ({ id }) => ({ url: `${baseURL}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['AppliedJob'],
    }),
  }),
});

export const {
  useGetAppliedJobsQuery,
  useGetAppliedJobQuery,
  useUpdateAppliedJobMutation,
  useDeleteAppliedJobMutation,
} = appliedJobsApi;
