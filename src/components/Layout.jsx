import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Badge, Button, Drawer, List, Typography } from 'antd';
import {
  LayoutDashboard,
  Tag,
  ShoppingCart,
  Megaphone,
  Timer,
  CreditCard,
  Settings,
  User,
  LogOut,
  Bell,
  MenuIcon,
  X,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import { logout } from '../store/slices/authSlice';

const { Header, Sider, Content } = AntLayout;
const { Text } = Typography;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, shopInfo } = useSelector((state) => state.auth);

  // Dummy notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Badge Created Successfully',
      message: 'Your "Hot Deal" badge has been created and is now active.',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Plan Usage Update',
      message: 'You have used 75% of your monthly badge limit.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Timer Expiring Soon',
      message: 'Your "Flash Sale" timer will expire in 2 hours.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your Pro plan subscription has been renewed.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new countdown timer styles!',
      time: '2 days ago',
      read: true,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard size={18} />,
      label: 'Dashboard',
    },
    {
      key: '/badges',
      icon: <Tag size={18} />,
      label: 'Badge Manager',
    },
    {
      key: '/cart',
      icon: <ShoppingCart size={18} />,
      label: 'Cart Settings',
    },
    {
      key: '/banners',
      icon: <Megaphone size={18} />,
      label: 'Discount Banner',
    },
    {
      key: '/timers',
      icon: <Timer size={18} />,
      label: 'Countdown Timer',
    },
    {
      key: '/billing',
      icon: <CreditCard size={18} />,
      label: 'Billing',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/welcome');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: 'Profile Settings',
    },
    {
      key: 'shop-settings',
      icon: <Settings size={16} />,
      label: 'Shop Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-orange-500" />;
      case 'info':
        return <Info size={16} className="text-blue-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AntLayout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        className="!bg-white border-r border-gray-200 !fixed !left-0 !top-0 !bottom-0 !z-10"
        style={{ height: '100vh', overflow: 'auto' }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-shopify-500 to-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-gray-900">ShopBolt</h2>
                <p className="text-xs text-gray-500">{shopInfo?.name}</p>
              </div>
            )}
          </div>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </Sider>
      
      <AntLayout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        <Header className="!bg-white !px-6 flex items-center justify-between border-b border-gray-200 !fixed !top-0 !right-0 !z-10" style={{ left: collapsed ? 80 : 240, transition: 'left 0.2s' }}>
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuIcon size={18} /> : <X size={18} />}
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center"
            />
            <h1 className="text-xl font-semibold text-gray-900 capitalize">
              {location.pathname.split('/')[1] || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge count={unreadCount} size="small">
              <Button
                type="text"
                icon={<Bell size={18} />}
                onClick={() => setNotificationDrawerOpen(true)}
                className="flex items-center justify-center"
              />
            </Badge>
            
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-50">
                <Avatar src={user?.avatar} size="small">
                  {user?.name?.charAt(0)}
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="p-6 bg-gray-50" style={{ marginTop: 64, minHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </AntLayout>

      {/* Notification Drawer */}
      <Drawer
        title="Notifications"
        placement="right"
        onClose={() => setNotificationDrawerOpen(false)}
        open={notificationDrawerOpen}
        width={400}
        extra={
          <Button
            type="text"
            size="small"
            onClick={() => {
              // Mark all as read logic would go here
              console.log('Mark all as read');
            }}
          >
            Mark all as read
          </Button>
        }
      >
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer hover:bg-gray-50 rounded-lg p-3 ${
                !item.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => {
                // Mark as read logic would go here
                console.log('Mark notification as read:', item.id);
              }}
            >
              <List.Item.Meta
                avatar={getNotificationIcon(item.type)}
                title={
                  <div className="flex items-center justify-between">
                    <Text strong={!item.read} className={!item.read ? 'text-gray-900' : 'text-gray-600'}>
                      {item.title}
                    </Text>
                    {!item.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                }
                description={
                  <div>
                    <Text className="text-gray-600 text-sm">{item.message}</Text>
                    <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </AntLayout>
  );
};

export default Layout;