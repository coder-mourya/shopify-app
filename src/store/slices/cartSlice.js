import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stickyCart: {
    enabled: false,
    position: 'bottom-right',
    style: 'floating',
    showProductCount: true,
    showTotal: true,
    backgroundColor: '#00B167',
    textColor: '#ffffff',
    borderRadius: 8,
    animation: 'slide',
  },
  cartDrawer: {
    enabled: true,
    position: 'right',
    width: 400,
    showRecommendations: true,
    showShippingBar: true,
    freeShippingThreshold: 50,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateStickyCart: (state, action) => {
      state.stickyCart = { ...state.stickyCart, ...action.payload };
    },
    toggleStickyCart: (state) => {
      state.stickyCart.enabled = !state.stickyCart.enabled;
    },
    updateCartDrawer: (state, action) => {
      state.cartDrawer = { ...state.cartDrawer, ...action.payload };
    },
    resetCartSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  updateStickyCart,
  toggleStickyCart,
  updateCartDrawer,
  resetCartSettings,
} = cartSlice.actions;
export default cartSlice.reducer;