import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banners: [
    {
      id: 1,
      name: 'Holiday Sale',
      text: '🎄 Holiday Sale - 30% OFF Everything! Use code: HOLIDAY30',
      backgroundColor: '#ff4d4f',
      textColor: '#ffffff',
      position: 'top',
      enabled: true,
      link: '/collections/sale',
      fontSize: 14,
      fontWeight: 'bold',
      padding: 12,
      animation: 'none',
    },
  ],
  selectedBanner: null,
  previewBanner: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    addBanner: (state, action) => {
      const newBanner = {
        id: Date.now(),
        ...action.payload,
        enabled: true,
      };
      state.banners.push(newBanner);
    },
    updateBanner: (state, action) => {
      const index = state.banners.findIndex(banner => banner.id === action.payload.id);
      if (index !== -1) {
        state.banners[index] = { ...state.banners[index], ...action.payload };
      }
    },
    deleteBanner: (state, action) => {
      state.banners = state.banners.filter(banner => banner.id !== action.payload);
    },
    toggleBanner: (state, action) => {
      const banner = state.banners.find(banner => banner.id === action.payload);
      if (banner) {
        banner.enabled = !banner.enabled;
      }
    },
    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
    },
    setPreviewBanner: (state, action) => {
      state.previewBanner = action.payload;
    },
  },
});

export const {
  addBanner,
  updateBanner,
  deleteBanner,
  toggleBanner,
  setSelectedBanner,
  setPreviewBanner,
} = bannerSlice.actions;
export default bannerSlice.reducer;