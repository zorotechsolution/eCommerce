import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return { user: null, isAuthenticated: false };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { user: null, isAuthenticated: false };
  }
};

const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login(state, action) {
      state.user = action.payload; // e.g., { username, email }
      state.isAuthenticated = true;
      saveAuthState(state);
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
