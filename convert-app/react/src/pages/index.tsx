import React from 'react';
import TodoList from '../components/TodoList';
import { Provider } from 'react-redux';
import store from '@/store/store';

function HomePage() {
  return (
    <div>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </div>
  );
}

export default HomePage; 