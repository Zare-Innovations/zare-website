import { configureStore } from '@reduxjs/toolkit';
import entityApi from './entity/api';
import { authApi } from './api/auth/auth.api';
import { jobApi } from './api/job.api';
import { appliedJobsApi } from './api/applied-jobs.api';
import { usersApi } from './api/users.api';
import { resetPasswordReducer } from './api/auth/resetPasswordSlice';


const { reducers, middleware } = entityApi;

export const store = configureStore({
  reducer: {
    ...reducers,
    resetPassword: resetPasswordReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [appliedJobsApi.reducerPath]: appliedJobsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...middleware,
      authApi.middleware,
      jobApi.middleware,
      appliedJobsApi.middleware,
      usersApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
