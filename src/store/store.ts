import { configureStore } from '@reduxjs/toolkit';
import workspacesReducer from './slices/workspace-slice';
import commentsReducer from './slices/comments-slice';


export const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    comments: commentsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;