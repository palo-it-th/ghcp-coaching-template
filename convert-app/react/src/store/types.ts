export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export interface Task {
  task: string;
  deadline: string;
  assignee: string;
}

export interface AppState {
  tasks: Task[];
}

export interface AddTaskAction {
  type: typeof ADD_TASK | typeof DELETE_TASK;
  payload: Task;
}