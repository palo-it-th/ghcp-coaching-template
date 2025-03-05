import { ADD_TASK, DELETE_TASK, EDIT_TASK, Task } from './types';

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (index: number) => ({
  type: DELETE_TASK,
  payload: index,
});

export const editTask = (index: number, task: Task) => ({
  type: EDIT_TASK,
  payload: { index, task },
});
