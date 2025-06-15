import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  isCompleted: false,
  selectedPlan: null,
  enabledFeatures: {
    badge: false,
    stickyCart: false,
    discountBanner: false,
    countdownTimer: false,
  },
  defaultSettings: {
    primaryColor: '#00B167',
    secondaryColor: '#0085FF',
    textColor: '#333333',
    position: 'top-right',
  },
};

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    toggleFeature: (state, action) => {
      state.enabledFeatures[action.payload] = !state.enabledFeatures[action.payload];
    },
    updateDefaultSettings: (state, action) => {
      state.defaultSettings = { ...state.defaultSettings, ...action.payload };
    },
    completeSetup: (state) => {
      state.isCompleted = true;
    },
    resetSetup: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  setSelectedPlan,
  toggleFeature,
  updateDefaultSettings,
  completeSetup,
  resetSetup,
} = setupSlice.actions;
export default setupSlice.reducer;