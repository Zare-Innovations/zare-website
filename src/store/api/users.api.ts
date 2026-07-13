import { CollectionQuery } from '@/app/core-fe/models/query';
import { encodeCollectionQuery } from '@/app/utility/query-builder';
import { baseQuery } from '@/store/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface User {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  organizationName?: string;
  bankAccount?: string;
  profilePicture?: string;
  accountId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUser {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bankAccount: string;
  profilePicture: string;
  organizationName: string;
}

export interface UserListResponse {
  total: number;
  items: User[];
}

const baseURL = '/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  refetchOnFocus: true,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserListResponse,
      { listId: string; query?: CollectionQuery }
    >({
      query: ({ listId, query }) => {
        let q = '';
        if (query) {
          q = `?q=${encodeCollectionQuery(query)}`;
        }
        return { url: `${baseURL}/list/${listId}${q}`, method: 'GET' };
      },
      providesTags: ['User'],
    }),

    getUser: builder.query<User, string>({
      query: (id) => ({ url: `${baseURL}/${id}`, method: 'GET' }),
      providesTags: ['User'],
    }),

    createUser: builder.mutation<User, CreateUser>({
      query: (data) => ({ url: baseURL, method: 'POST', body: data }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<
      User,
      { id: string; data: Partial<CreateUser> }
    >({
      query: ({ id, data }) => ({
        url: `${baseURL}/${id}`,
        method: 'PUT',
        body: { ...data, id },
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<User, { id: string }>({
      query: ({ id }) => ({ url: `${baseURL}/${id}`, method: 'DELETE' }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
