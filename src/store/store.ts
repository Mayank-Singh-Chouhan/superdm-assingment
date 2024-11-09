import { configureStore } from '@reduxjs/toolkit';
import workspacesReducer from './slices/workspace-slice';


export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;