import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Badge, Row, Col } from 'antd';
import { Check, Star } from 'lucide-react';
import { setSelectedPlan } from '../../store/slices/setupSlice';

const PlanSelection = () => {
  const dispatch = useDispatch();
  const { selectedPlan } = useSelector((state) => state.setup);
  const { availablePlans } = useSelector((state) => state.billing);

  const handlePlanSelect = (plan) => {
    dispatch(setSelectedPlan(plan));
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600">
          Start with our free plan and upgrade anytime as you grow
        </p>
      </div>

      <Row gutter={[24, 24]}>
        {availablePlans.map((plan) => (
          <Col xs={24} md={8} key={plan.id}>
            <Card
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedPlan?.id === plan.id
                  ? 'border-2 border-shopify-500 shadow-lg'
                  : 'border border-gray-200'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <Badge.Ribbon text="Most Popular" color="green">
                  <div className="pt-4" />
                </Badge.Ribbon>
              )}
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  {plan.popular && <Star className="w-6 h-6 text-yellow-500 mr-2" />}
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">
                    /{plan.billing === 'forever' ? 'forever' : 'month'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-left">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type={selectedPlan?.id === plan.id ? 'primary' : 'default'}
                  block
                  size="large"
                  className={selectedPlan?.id === plan.id ? 'bg-shopify-500' : ''}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          You can change your plan anytime. No long-term commitments.
        </p>
      </div>
    </div>
  );
};

export default PlanSelection;