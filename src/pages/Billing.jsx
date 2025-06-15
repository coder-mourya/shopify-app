import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Button, Table, Progress, Badge, Statistic, Modal } from 'antd';
import { CreditCard, TrendingUp, Check, Crown, Star } from 'lucide-react';
import { updateCurrentPlan } from '../store/slices/billingSlice';

const Billing = () => {
  const dispatch = useDispatch();
  const { currentPlan, availablePlans, billingHistory, usage } = useSelector((state) => state.billing);

  const billingColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          status={status === 'paid' ? 'success' : 'error'}
          text={status.toUpperCase()}
        />
      ),
    },
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      render: (invoice) => (
        <Button type="link" size="small">
          {invoice}
        </Button>
      ),
    },
  ];

  const handleUpgrade = (plan) => {
    Modal.confirm({
      title: `Upgrade to ${plan.name}`,
      content: `Are you sure you want to upgrade to the ${plan.name} plan for $${plan.price}/month?`,
      okText: 'Upgrade',
      onOk: () => {
        dispatch(updateCurrentPlan(plan));
      },
    });
  };

  const getUsagePercentage = (current, limit) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#ff4d4f';
    if (percentage >= 70) return '#faad14';
    return '#52c41a';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-gray-600">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card title="Current Plan" extra={<Badge text={currentPlan.name} color="green" />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Plan Features</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {currentPlan.name !== 'Advanced' && (
                <Button
                  type="primary"
                  icon={<TrendingUp size={16} />}
                  className="bg-shopify-500"
                  onClick={() => handleUpgrade(availablePlans.find(p => p.name === 'Pro'))}
                >
                  Upgrade Plan
                </Button>
              )}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-2">Usage Overview</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Badges</span>
                    <span className="text-sm text-gray-600">
                      {usage.badges} / {currentPlan.limits.badges === -1 ? '∞' : currentPlan.limits.badges}
                    </span>
                  </div>
                  <Progress
                    percent={getUsagePercentage(usage.badges, currentPlan.limits.badges)}
                    strokeColor={getUsageColor(getUsagePercentage(usage.badges, currentPlan.limits.badges))}
                    size="small"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Products</span>
                    <span className="text-sm text-gray-600">
                      {usage.products} / {currentPlan.limits.products === -1 ? '∞' : currentPlan.limits.products}
                    </span>
                  </div>
                  <Progress
                    percent={getUsagePercentage(usage.products, currentPlan.limits.products)}
                    strokeColor={getUsageColor(getUsagePercentage(usage.products, currentPlan.limits.products))}
                    size="small"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Banners</span>
                    <span className="text-sm text-gray-600">
                      {usage.banners} / {currentPlan.limits.banners === -1 ? '∞' : currentPlan.limits.banners}
                    </span>
                  </div>
                  <Progress
                    percent={getUsagePercentage(usage.banners, currentPlan.limits.banners)}
                    strokeColor={getUsageColor(getUsagePercentage(usage.banners, currentPlan.limits.banners))}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Available Plans */}
      <Card title="Available Plans">
        <Row gutter={[24, 24]}>
          {availablePlans.map((plan) => (
            <Col xs={24} md={8} key={plan.id}>
              <Card
                className={`relative h-full ${
                  currentPlan.name === plan.name
                    ? 'border-2 border-shopify-500'
                    : 'border border-gray-200'
                } ${plan.popular ? 'shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge.Ribbon text="Most Popular" color="green">
                      <div className="pt-4" />
                    </Badge.Ribbon>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {plan.popular && <Star className="w-6 h-6 text-yellow-500 mr-2" />}
                    {plan.name === 'Advanced' && <Crown className="w-6 h-6 text-purple-500 mr-2" />}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">
                      /{plan.billing === 'forever' ? 'forever' : 'month'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type={currentPlan.name === plan.name ? 'default' : 'primary'}
                    block
                    size="large"
                    disabled={currentPlan.name === plan.name}
                    onClick={() => handleUpgrade(plan)}
                    className={currentPlan.name !== plan.name ? 'bg-shopify-500' : ''}
                  >
                    {currentPlan.name === plan.name ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Billing History */}
      <Card title="Billing History" extra={<Button icon={<CreditCard size={16} />}>Update Payment Method</Button>}>
        <Table
          columns={billingColumns}
          dataSource={billingHistory}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Billing;