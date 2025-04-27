import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask } from '../store/actions';
import { AppState, Task } from '../store/types';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton,
  Box, 
  Paper,
  Container,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './TodoList.css';

function TodoList() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Task>({
    defaultValues: {
      task: '',
      deadline: '',
      assignee: ''
    }
  });
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Task>({
    task: '',
    deadline: '',
    assignee: ''
  });
  
  const dispatch = useDispatch();
  const tasks = useSelector((state: AppState) => state.tasks);

  const onSubmit = (data: Task) => {
    dispatch(addTask(data));
    reset();
  };

  const handleDeleteTask = (index: number) => {
    dispatch(deleteTask(index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditFormData({ ...tasks[index] });
  };

  const handleEditChange = (field: keyof Task, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editFormData.task && editFormData.deadline) {
      dispatch(editTask(editingIndex, editFormData));
      setEditingIndex(null);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" gutterBottom align="center">TODO List</Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
          <Controller
            name="task"
            control={control}
            rules={{ required: "Task is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task"
                fullWidth
                margin="normal"
                error={!!errors.task}
                helperText={errors.task?.message}
              />
            )}
          />
          
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
              />
            )}
          />
          
          <Controller
            name="assignee"
            control={control}
            rules={{ required: "Assignee is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assignee"
                fullWidth
                margin="normal"
                error={!!errors.assignee}
                helperText={errors.assignee?.message}
              />
            )}
          />
          
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Task
          </Button>
        </Box>
        
        <List>
          {tasks.map((task, index) => (
            <ListItem 
              key={index} 
              divider
              sx={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              {editingIndex === index ? (
                <Box sx={{ width: '100%' }}>
                  <TextField
                    label="Task"
                    fullWidth
                    margin="dense"
                    value={editFormData.task}
                    onChange={(e) => handleEditChange('task', e.target.value)}
                    required
                  />
                  <TextField
                    label="Deadline"
                    type="date"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    value={editFormData.deadline}
                    onChange={(e) => handleEditChange('deadline', e.target.value)}
                    required
                  />
                  <TextField
                    label="Assignee"
                    fullWidth
                    margin="dense"
                    value={editFormData.assignee}
                    onChange={(e) => handleEditChange('assignee', e.target.value)}
                    required
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleSaveEdit}
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={handleCancelEdit}
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <ListItemText
                    primary={task.task}
                    secondary={`Deadline: ${task.deadline} | Assignee: ${task.assignee}`}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(index)}
                  />
                  <Box>
                    <IconButton color="primary" onClick={() => handleEditClick(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTask(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default TodoList;