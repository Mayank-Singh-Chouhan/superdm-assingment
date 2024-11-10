import { COMMENTS_DATA } from "@/data/task-comments-data";
import { ITaskComment } from "@/models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IComment {
    comments: Array<ITaskComment>;
}

const initialState: IComment = {
  comments : COMMENTS_DATA,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
      addComments: (state, action:PayloadAction<ITaskComment>) => {
        const newComment = action.payload
        state.comments = [newComment, ...state.comments];
      }
    },
  });
  
  export const { addComments } = commentsSlice.actions;
  
  export default commentsSlice.reducer;