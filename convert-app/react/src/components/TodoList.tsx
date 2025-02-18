import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store/actions';
import { AppState } from '../store/types';
import './TodoList.css';

function TodoList() {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.tasks);

  const handleAddTask = () => {
    if (task && deadline) {
      dispatch(addTask({ task, deadline, assignee }));
      setTask('');
      setDeadline('');
      setAssignee('');
    }else {
      alert('Please fill all fields');
    }
  };

  const handleDeleteTask = (index: number) => {
    dispatch(deleteTask(index));
  };

  return (
    <div className="todo-list">
      <h1>TODO List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span>{t.task} - {t.deadline} - {t.assignee}</span>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;