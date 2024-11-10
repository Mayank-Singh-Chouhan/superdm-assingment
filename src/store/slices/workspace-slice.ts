import { ITask } from '@/models/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OPEN_TASK_DATA } from '@/data/open-task-data'
import { CLOSED_TASK_DATA } from '@/data/closed-task-data';
import { IN_PROGRESS_TASK_DATA } from '@/data/inprogress-task-data';
import { TaskStatus } from '@/models/enums';

interface IWorkspace {
  open: Array<ITask>,
  inprogress: Array<ITask>,
  close: Array<ITask>
}

const initialState: IWorkspace = {
  open: OPEN_TASK_DATA.sort((a, b) => {
    return a.name.localeCompare(b.name);
  }),
  inprogress: IN_PROGRESS_TASK_DATA.sort((a, b) => {
    return a.name.localeCompare(b.name);
  }),
  close: CLOSED_TASK_DATA.sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
};

interface ChangeStatusPayload {
  task: ITask;
  newStatus: TaskStatus;
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<ChangeStatusPayload>) => {
      const newStatus = action.payload.newStatus;
      const task = action.payload.task;

      if (task.status === TaskStatus.CLOSED) {
        const index = state.close.findIndex((obj) => obj.id == task.id);
        state.close.splice(index, 1);
      } else if (task.status === TaskStatus.IN_PROGRESS) {
        const index = state.inprogress.findIndex((obj) => obj.id == task.id);
        state.inprogress.splice(index, 1);
      } else if (task.status == TaskStatus.OPEN) {
        const index = state.open.findIndex((obj) => obj.id == task.id);
        state.open.splice(index, 1);
      }

      if (newStatus === TaskStatus.CLOSED) {
        state.close = [{ ...task, status: newStatus }, ...state.close]
      } else if (newStatus === TaskStatus.IN_PROGRESS) {
        state.inprogress = [{ ...task, status: newStatus }, ...state.inprogress]
      } else if (newStatus == TaskStatus.OPEN) {
        state.open = [{ ...task, status: newStatus }, ...state.open]
      }
    },
    sortTasksByUpdatedAt: (state, action: PayloadAction<TaskStatus>) => {
      const toggleSortOrder = (tasks: ITask[]) => {
        const isAscending =
          tasks.length > 1 &&
          new Date(tasks[0].updated_at).getTime() < new Date(tasks[tasks.length - 1].updated_at).getTime();

        return tasks.sort((a, b) =>
          isAscending
            ? new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            : new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
        );
      };

      if(action.payload === TaskStatus.CLOSED) {
        state.close = toggleSortOrder(state.close);
      } else if(action.payload === TaskStatus.OPEN) {
        state.open = toggleSortOrder(state.open);
      } else if(action.payload === TaskStatus.IN_PROGRESS) {
        state.inprogress = toggleSortOrder(state.inprogress);
      }
    },
    sortTasksByCreatedAt: (state, action: PayloadAction<TaskStatus>) => {
      const toggleSortOrder = (tasks: ITask[]) => {
        const isAscending =
          tasks.length > 1 &&
          new Date(tasks[0].created_at).getTime() < new Date(tasks[tasks.length - 1].created_at).getTime();

        return tasks.sort((a, b) =>
          isAscending
            ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      };

      if (action.payload === TaskStatus.CLOSED) {
        state.close = toggleSortOrder(state.close);
      } else if (action.payload === TaskStatus.OPEN) {
        state.open = toggleSortOrder(state.open);
      } else if (action.payload === TaskStatus.IN_PROGRESS) {
        state.inprogress = toggleSortOrder(state.inprogress);
      }
    },
    clearFilters: (state, action: PayloadAction<TaskStatus>) => {
      if(action.payload === TaskStatus.CLOSED) {
        state.close = state.close.sort((a, b) => a.name.localeCompare(b.name))
      } else if(action.payload === TaskStatus.OPEN) {
        state.open = state.open.sort((a, b) => a.name.localeCompare(b.name))
      } else if(action.payload === TaskStatus.IN_PROGRESS) {
        state.inprogress = state.inprogress.sort((a, b) => a.name.localeCompare(b.name))
      }
    },
  },
});

export const { changeStatus, sortTasksByUpdatedAt, sortTasksByCreatedAt, clearFilters } = workspaceSlice.actions;

export default workspaceSlice.reducer;