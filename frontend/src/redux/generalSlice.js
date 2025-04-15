// src/redux/generalSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state, fetching from localStorage or defaulting to 'light'
const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Load from localStorage if exists
  isDrawerOpen: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // Action to set light mode
    setLightMode(state) {
      state.theme = 'light';
      localStorage.setItem('theme', 'light'); // Sync to localStorage
    },
    // Action to set dark mode
    setDarkMode(state) {
      state.theme = 'dark';
      localStorage.setItem('theme', 'dark'); // Sync to localStorage
    },
    // Action to toggle between light and dark mode
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); // Sync to localStorage
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

// Export the actions to use in components
export const { setLightMode, setDarkMode, toggleTheme,setDrawerOpen,toggleDrawer } = generalSlice.actions;

// Export the reducer to include in the store
export default generalSlice.reducer;