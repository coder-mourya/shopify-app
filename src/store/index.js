import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import setupSlice from './slices/setupSlice';
import badgeSlice from './slices/badgeSlice';
import cartSlice from './slices/cartSlice';
import bannerSlice from './slices/bannerSlice';
import timerSlice from './slices/timerSlice';
import billingSlice from './slices/billingSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    setup: setupSlice,
    badge: badgeSlice,
    cart: cartSlice,
    banner: bannerSlice,
    timer: timerSlice,
    billing: billingSlice,
  },
});

export default store;