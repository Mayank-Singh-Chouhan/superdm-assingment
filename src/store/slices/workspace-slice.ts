import { ITask } from '@/models/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface IWorkspace {
    open : Array<ITask>,
    inprogress : Array<ITask>,
    close: Array<ITask>
}

const initialState: IWorkspace = {
  open : [],
  inprogress : [],
  close: []
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    
  },
});

export const {  } = workspaceSlice.actions;

export default workspaceSlice.reducer;