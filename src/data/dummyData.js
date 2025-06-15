// Dummy data for development
export const dummyProducts = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    price: 99.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'active',
    inventory: 50,
    vendor: 'TechBrand',
    category: 'Electronics',
  },
  {
    id: '2',
    title: 'Organic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'active',
    inventory: 120,
    vendor: 'EcoWear',
    category: 'Clothing',
  },
  {
    id: '3',
    title: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1275043/pexels-photo-1275043.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'active',
    inventory: 75,
    vendor: 'HydroPlus',
    category: 'Home & Garden',
  },
  {
    id: '4',
    title: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'active',
    inventory: 30,
    vendor: 'SoundWave',
    category: 'Electronics',
  },
  {
    id: '5',
    title: 'Yoga Mat',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=200',
    status: 'active',
    inventory: 85,
    vendor: 'FitLife',
    category: 'Sports & Fitness',
  },
];

export const dummyAnalytics = {
  totalViews: 12547,
  totalClicks: 892,
  conversionRate: 7.1,
  revenue: 4521.89,
  topPerformingBadges: [
    { name: 'Hot Deal', clicks: 342, conversions: 24 },
    { name: 'New Arrival', clicks: 289, conversions: 18 },
  ],
  weeklyData: [
    { day: 'Mon', views: 1850, clicks: 127 },
    { day: 'Tue', views: 1920, clicks: 142 },
    { day: 'Wed', views: 1780, clicks: 108 },
    { day: 'Thu', views: 2100, clicks: 156 },
    { day: 'Fri', views: 2200, clicks: 178 },
    { day: 'Sat', views: 1890, clicks: 134 },
    { day: 'Sun', views: 1807, clicks: 121 },
  ],
};

export const dummyShopInfo = {
  name: 'Demo Store',
  domain: 'demo-store.myshopify.com',
  email: 'admin@demo-store.com',
  plan: 'Shopify Plus',
  country: 'United States',
  currency: 'USD',
  timezone: 'America/New_York',
};

export const dummyUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@demo-store.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  role: 'Store Owner',
  permissions: ['all'],
};