import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/auth/auth.api';
import { jobApi } from './api/job.api';
import { appliedJobsApi } from './api/applied-jobs.api';
import { usersApi } from './api/users.api';
import { candidatesApi } from './api/candidates.api';
import { resetPasswordReducer } from './api/auth/resetPasswordSlice';


export const store = configureStore({
  reducer: {
    resetPassword: resetPasswordReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [appliedJobsApi.reducerPath]: appliedJobsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [candidatesApi.reducerPath]: candidatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      jobApi.middleware,
      appliedJobsApi.middleware,
      usersApi.middleware,
      candidatesApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
