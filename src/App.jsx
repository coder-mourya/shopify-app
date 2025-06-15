import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './store';
import AuthGuard from './components/AuthGuard';
import WelcomeScreen from './pages/WelcomeScreen';
import SetupWizard from './pages/SetupWizard';
import Dashboard from './pages/Dashboard';
import BadgeManager from './pages/BadgeManager';
import CartSettings from './pages/CartSettings';
import DiscountBanner from './pages/DiscountBanner';
import CountdownTimer from './pages/CountdownTimer';
import Billing from './pages/Billing';
import Layout from './components/Layout';

const theme = {
  token: {
    colorPrimary: '#00B167',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#0085FF',
    borderRadius: 8,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      fontWeight: 500,
    },
    Card: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 6,
    },
    Select: {
      borderRadius: 6,
    },
  },
};

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/setup" element={<SetupWizard />} />
            <Route path="/" element={
              <AuthGuard>
                <Layout />
              </AuthGuard>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="badges" element={<BadgeManager />} />
              <Route path="cart" element={<CartSettings />} />
              <Route path="banners" element={<DiscountBanner />} />
              <Route path="timers" element={<CountdownTimer />} />
              <Route path="billing" element={<Billing />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;