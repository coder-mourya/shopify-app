import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPlan: {
    name: 'Free',
    price: 0,
    features: [
      'Basic badges',
      'Sticky cart',
      'Up to 100 products',
      'Email support',
    ],
    limits: {
      badges: 2,
      products: 100,
      banners: 1,
      timers: 1,
    },
  },
  availablePlans: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billing: 'forever',
      features: [
        'Basic badges',
        'Sticky cart',
        'Up to 100 products',
        'Email support',
      ],
      limits: {
        badges: 2,
        products: 100,
        banners: 1,
        timers: 1,
      },
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9,
      billing: 'monthly',
      features: [
        'Unlimited badges',
        'Advanced cart features',
        'Up to 1000 products',
        'Discount banners',
        'Countdown timers',
        'Priority support',
        'Analytics dashboard',
      ],
      limits: {
        badges: -1,
        products: 1000,
        banners: 5,
        timers: 5,
      },
      popular: true,
    },
    {
      id: 'advanced',
      name: 'Advanced',
      price: 19,
      billing: 'monthly',
      features: [
        'Everything in Pro',
        'Unlimited products',
        'Custom branding',
        'API access',
        'Advanced analytics',
        'White-label solution',
        'Dedicated support',
      ],
      limits: {
        badges: -1,
        products: -1,
        banners: -1,
        timers: -1,
      },
      popular: false,
    },
  ],
  billingHistory: [
    {
      id: 1,
      date: '2024-01-01',
      amount: 9,
      status: 'paid',
      plan: 'Pro',
      invoice: 'INV-001',
    },
    {
      id: 2,
      date: '2023-12-01',
      amount: 9,
      status: 'paid',
      plan: 'Pro',
      invoice: 'INV-002',
    },
  ],
  usage: {
    badges: 1,
    products: 45,
    banners: 1,
    timers: 1,
  },
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    updateCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    addBillingRecord: (state, action) => {
      state.billingHistory.unshift(action.payload);
    },
    updateUsage: (state, action) => {
      state.usage = { ...state.usage, ...action.payload };
    },
  },
});

export const { updateCurrentPlan, addBillingRecord, updateUsage } = billingSlice.actions;
export default billingSlice.reducer;