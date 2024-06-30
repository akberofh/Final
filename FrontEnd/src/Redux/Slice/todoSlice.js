import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    userTodos: [],
  },
  reducers: {
    setTodos: (state, action) => {
      state.userTodos = action.payload;
    },
    addTodo: (state, action) => {
      state.userTodos.push(action.payload);
    },
    updatedTodo: (state,action) => {
      state.userTodos.put(action.payload)
    },
    removeTodo: (state, action) => {
      state.userTodos = state.userTodos.filter(todo => todo._id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, removeTodo,updatedTodo } = todoSlice.actions;

export default todoSlice.reducer;