import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: [
    {
      id: 1,
      name: 'Flash Sale Timer',
      endTime: '2024-12-31T23:59:59',
      style: 'modern',
      position: 'product-page',
      backgroundColor: '#ff4d4f',
      textColor: '#ffffff',
      fontSize: 18,
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      enabled: true,
      products: ['1', '2', '3'],
    },
  ],
  selectedTimer: null,
  previewTimer: null,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      const newTimer = {
        id: Date.now(),
        ...action.payload,
        enabled: true,
        products: [],
      };
      state.timers.push(newTimer);
    },
    updateTimer: (state, action) => {
      const index = state.timers.findIndex(timer => timer.id === action.payload.id);
      if (index !== -1) {
        state.timers[index] = { ...state.timers[index], ...action.payload };
      }
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.enabled = !timer.enabled;
      }
    },
    setSelectedTimer: (state, action) => {
      state.selectedTimer = action.payload;
    },
    setPreviewTimer: (state, action) => {
      state.previewTimer = action.payload;
    },
    assignTimerToProducts: (state, action) => {
      const { timerId, productIds } = action.payload;
      const timer = state.timers.find(timer => timer.id === timerId);
      if (timer) {
        timer.products = productIds;
      }
    },
  },
});

export const {
  addTimer,
  updateTimer,
  deleteTimer,
  toggleTimer,
  setSelectedTimer,
  setPreviewTimer,
  assignTimerToProducts,
} = timerSlice.actions;
export default timerSlice.reducer;