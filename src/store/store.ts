import { configureStore } from '@reduxjs/toolkit';
import entityApi from './entity/api';
import { authApi } from './api/auth/auth.api';
import { jobApi } from './api/job.api';
import { resetPasswordReducer } from './api/auth/resetPasswordSlice';


const { reducers, middleware} = entityApi;

export const store = configureStore({
  reducer: {
    ...reducers,
     resetPassword: resetPasswordReducer,
     [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    // [dashboardApi.reducerPath]: dashboardApi.reducer,
    // [departmentsOtherApi.reducerPath]: departmentsOtherApi.reducer,
    // [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...middleware,
      authApi.middleware,
      jobApi.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


