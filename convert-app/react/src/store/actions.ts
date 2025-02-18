import { ADD_TASK, DELETE_TASK, Task } from './types';

export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (index: number) => ({
  type: DELETE_TASK,
  payload: index,
});
