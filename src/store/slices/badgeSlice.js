import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  badges: [
    {
      id: 1,
      name: 'Hot Deal',
      text: 'HOT',
      color: '#ff4d4f',
      backgroundColor: '#fff2f0',
      position: 'top-left',
      enabled: true,
      products: ['1', '3', '5'],
    },
    {
      id: 2,
      name: 'New Arrival',
      text: 'NEW',
      color: '#52c41a',
      backgroundColor: '#f6ffed',
      position: 'top-right',
      enabled: true,
      products: ['2', '4'],
    },
  ],
  selectedBadge: null,
  previewBadge: null,
};

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    addBadge: (state, action) => {
      const newBadge = {
        id: Date.now(),
        ...action.payload,
        enabled: true,
        products: [],
      };
      state.badges.push(newBadge);
    },
    updateBadge: (state, action) => {
      const index = state.badges.findIndex(badge => badge.id === action.payload.id);
      if (index !== -1) {
        state.badges[index] = { ...state.badges[index], ...action.payload };
      }
    },
    deleteBadge: (state, action) => {
      state.badges = state.badges.filter(badge => badge.id !== action.payload);
    },
    toggleBadge: (state, action) => {
      const badge = state.badges.find(badge => badge.id === action.payload);
      if (badge) {
        badge.enabled = !badge.enabled;
      }
    },
    setSelectedBadge: (state, action) => {
      state.selectedBadge = action.payload;
    },
    setPreviewBadge: (state, action) => {
      state.previewBadge = action.payload;
    },
    assignBadgeToProducts: (state, action) => {
      const { badgeId, productIds } = action.payload;
      const badge = state.badges.find(badge => badge.id === badgeId);
      if (badge) {
        badge.products = productIds;
      }
    },
  },
});

export const {
  addBadge,
  updateBadge,
  deleteBadge,
  toggleBadge,
  setSelectedBadge,
  setPreviewBadge,
  assignBadgeToProducts,
} = badgeSlice.actions;
export default badgeSlice.reducer;