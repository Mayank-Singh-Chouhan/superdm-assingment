import { ITask } from '@/models/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OPEN_TASK_DATA } from '@/data/open-task-data'
import { CLOSED_TASK_DATA } from '@/data/closed-task-data';
import { IN_PROGRESS_TASK_DATA } from '@/data/inprogress-task-data';
import { TaskStatus } from '@/models/enums';

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

interface ChangeStatusPayload {
  task: ITask;
  newStatus: TaskStatus;
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    changeStatus: (state, action:PayloadAction<ChangeStatusPayload>) => {
      const newStatus = action.payload.newStatus;
      const task = action.payload.task;

      if(task.status === TaskStatus.CLOSED) {
        const index = state.close.findIndex((obj) => obj.id == task.id);
        state.close.splice(index, 1);
      } else if(task.status === TaskStatus.IN_PROGRESS) {
        const index = state.inprogress.findIndex((obj) => obj.id == task.id);
        state.inprogress.splice(index, 1);
      } else if(task.status == TaskStatus.OPEN) {
        const index = state.open.findIndex((obj) => obj.id == task.id);
        state.open.splice(index, 1);
      }

      if(newStatus === TaskStatus.CLOSED) {
        state.close = [{...task, status: newStatus}, ...state.close]
      } else if(newStatus === TaskStatus.IN_PROGRESS) {
        state.inprogress = [{...task, status: newStatus}, ...state.inprogress]
      } else if(newStatus == TaskStatus.OPEN) {
        state.open = [{...task, status: newStatus}, ...state.open]
      }
    },
  },
});

export const { changeStatus } = workspaceSlice.actions;

export default workspaceSlice.reducer;