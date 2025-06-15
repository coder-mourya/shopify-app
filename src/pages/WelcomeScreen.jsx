import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Card } from 'antd';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { shopInfo } = useSelector((state) => state.auth);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'Boost Sales',
      description: 'Increase conversions with eye-catching badges and timers',
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'Easy Setup',
      description: 'Get started in minutes with our simple wizard',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: 'Track Performance',
      description: 'Monitor your success with detailed analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-shopify-50 to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-shopify-500 to-primary-500 rounded-2xl mb-6">
            <span className="text-white font-bold text-2xl">SB</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ShopBolt
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Let's set up your store for success!
          </p>
          <p className="text-lg text-gray-500">
            Hi {shopInfo?.name}! Ready to boost your sales with powerful widgets?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center space-y-4 p-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/setup')}
            className="px-8 py-6 h-auto text-lg font-semibold bg-gradient-to-r from-shopify-500 to-primary-500 border-none hover:shadow-lg transition-all duration-300"
            icon={<ArrowRight size={20} />}
            iconPosition="end"
          >
            Start 3-Step Setup
          </Button>
          <p className="text-gray-500 mt-4">
            Takes less than 5 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;