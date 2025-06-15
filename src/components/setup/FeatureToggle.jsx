import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Switch, Row, Col } from 'antd';
import { Tag, ShoppingCart, Megaphone, Timer } from 'lucide-react';
import { toggleFeature } from '../../store/slices/setupSlice';

const FeatureToggle = () => {
  const dispatch = useDispatch();
  const { enabledFeatures } = useSelector((state) => state.setup);

  const features = [
    {
      key: 'badge',
      title: 'Product Badges',
      description: 'Add eye-catching badges to your products',
      icon: <Tag className="w-8 h-8 text-blue-500" />,
      color: 'blue',
    },
    {
      key: 'stickyCart',
      title: 'Sticky Cart',
      description: 'Keep the cart visible while customers browse',
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />,
      color: 'green',
    },
    {
      key: 'discountBanner',
      title: 'Discount Banner',
      description: 'Show promotional messages across your store',
      icon: <Megaphone className="w-8 h-8 text-orange-500" />,
      color: 'orange',
    },
    {
      key: 'countdownTimer',
      title: 'Countdown Timer',
      description: 'Create urgency with countdown timers',
      icon: <Timer className="w-8 h-8 text-red-500" />,
      color: 'red',
    },
  ];

  const handleToggle = (featureKey) => {
    dispatch(toggleFeature(featureKey));
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Enable Features
        </h2>
        <p className="text-gray-600">
          Choose which features you'd like to use in your store
        </p>
      </div>

      <Row gutter={[24, 24]}>
        {features.map((feature) => (
          <Col xs={24} md={12} key={feature.key}>
            <Card
              className={`transition-all duration-300 ${
                enabledFeatures[feature.key]
                  ? 'border-2 border-shopify-500 bg-shopify-50'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <Switch
                      checked={enabledFeatures[feature.key]}
                      onChange={() => handleToggle(feature.key)}
                      className="ml-4"
                    />
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          You can enable or disable features anytime from your dashboard
        </p>
      </div>
    </div>
  );
};

export default FeatureToggle;