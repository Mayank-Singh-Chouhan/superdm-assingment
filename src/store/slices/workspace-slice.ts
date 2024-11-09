import { ITask } from '@/models/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { OPEN_TASK_DATA } from '@/data/open-task-data'
import { CLOSED_TASK_DATA } from '@/data/closed-task-data';
import { IN_PROGRESS_TASK_DATA } from '@/data/inprogress-task-data';

interface IWorkspace {
    open : Array<ITask>,
    inprogress : Array<ITask>,
    close: Array<ITask>
}

const initialState: IWorkspace = {
  open : OPEN_TASK_DATA,
  inprogress : IN_PROGRESS_TASK_DATA,
  close: CLOSED_TASK_DATA
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    
  },
});

export const {  } = workspaceSlice.actions;

export default workspaceSlice.reducer;