import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Statistic, Progress, Table, Button, Badge } from 'antd';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, Users } from 'lucide-react';
import { dummyAnalytics } from '../data/dummyData';

const Dashboard = () => {
  const { badges } = useSelector((state) => state.badge);
  const { banners } = useSelector((state) => state.banner);
  const { timers } = useSelector((state) => state.timer);
  const { stickyCart } = useSelector((state) => state.cart);
  const { currentPlan, usage } = useSelector((state) => state.billing);

  const activeWidgets = [
    { name: 'Product Badges', count: badges.filter(b => b.enabled).length, total: badges.length },
    { name: 'Discount Banners', count: banners.filter(b => b.enabled).length, total: banners.length },
    { name: 'Countdown Timers', count: timers.filter(t => t.enabled).length, total: timers.length },
    { name: 'Sticky Cart', count: stickyCart.enabled ? 1 : 0, total: 1 },
  ];

  const performanceColumns = [
    {
      title: 'Widget',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      title: 'Conversions',
      dataIndex: 'conversions',
      key: 'conversions',
      render: (value) => <span className="font-medium text-green-600">{value}</span>,
    },
    {
      title: 'Rate',
      key: 'rate',
      render: (_, record) => {
        const rate = ((record.conversions / record.clicks) * 100).toFixed(1);
        return <span className="font-medium">{rate}%</span>;
      },
    },
  ];

  const getUsagePercentage = (current, limit) => {
    if (limit === -1) return 0; // Unlimited
    return (current / limit) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your store's performance</p>
        </div>
        <Button type="primary" className="bg-shopify-500">
          View Store
        </Button>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Total Views"
              value={dummyAnalytics.totalViews}
              prefix={<Eye className="w-4 h-4 text-blue-500" />}
              valueStyle={{ color: '#0085FF' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Total Clicks"
              value={dummyAnalytics.totalClicks}
              prefix={<MousePointer className="w-4 h-4 text-green-500" />}
              valueStyle={{ color: '#00B167' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={dummyAnalytics.conversionRate}
              precision={1}
              suffix="%"
              prefix={<TrendingUp className="w-4 h-4 text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={dummyAnalytics.revenue}
              precision={2}
              prefix={<DollarSign className="w-4 h-4 text-purple-500" />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Active Widgets */}
        <Col xs={24} lg={12}>
          <Card title="Active Widgets" className="h-full">
            <div className="space-y-4">
              {activeWidgets.map((widget, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{widget.name}</p>
                    <p className="text-sm text-gray-600">
                      {widget.count} of {widget.total} active
                    </p>
                  </div>
                  <Badge
                    count={widget.count}
                    style={{ backgroundColor: widget.count > 0 ? '#00B167' : '#d9d9d9' }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Usage Overview */}
        <Col xs={24} lg={12}>
          <Card title="Usage Overview" extra={<Badge text={currentPlan.name} color="green" />} className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Badges</span>
                  <span className="text-sm text-gray-600">
                    {usage.badges} / {currentPlan.limits.badges === -1 ? '∞' : currentPlan.limits.badges}
                  </span>
                </div>
                <Progress
                  percent={getUsagePercentage(usage.badges, currentPlan.limits.badges)}
                  strokeColor="#00B167"
                  size="small"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Products</span>
                  <span className="text-sm text-gray-600">
                    {usage.products} / {currentPlan.limits.products === -1 ? '∞' : currentPlan.limits.products}
                  </span>
                </div>
                <Progress
                  percent={getUsagePercentage(usage.products, currentPlan.limits.products)}
                  strokeColor="#0085FF"
                  size="small"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Banners</span>
                  <span className="text-sm text-gray-600">
                    {usage.banners} / {currentPlan.limits.banners === -1 ? '∞' : currentPlan.limits.banners}
                  </span>
                </div>
                <Progress
                  percent={getUsagePercentage(usage.banners, currentPlan.limits.banners)}
                  strokeColor="#fa8c16"
                  size="small"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Table */}
      <Card title="Top Performing Widgets">
        <Table
          columns={performanceColumns}
          dataSource={dummyAnalytics.topPerformingBadges}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
};

export default Dashboard;