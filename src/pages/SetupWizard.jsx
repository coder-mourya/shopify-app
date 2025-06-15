import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Steps, Card, Button, Space } from 'antd';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { setCurrentStep, completeSetup } from '../store/slices/setupSlice';
import PlanSelection from '../components/setup/PlanSelection';
import FeatureToggle from '../components/setup/FeatureToggle';
import DefaultSettings from '../components/setup/DefaultSettings';

const SetupWizard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentStep } = useSelector((state) => state.setup);

  const steps = [
    {
      title: 'Choose Plan',
      description: 'Select the plan that works for you',
      component: <PlanSelection />,
    },
    {
      title: 'Enable Features',
      description: 'Toggle the features you want to use',
      component: <FeatureToggle />,
    },
    {
      title: 'Default Settings',
      description: 'Set your default colors and positions',
      component: <DefaultSettings />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      dispatch(completeSetup());
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    } else {
      navigate('/welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Your Store
          </h1>
          <p className="text-gray-600">
            Complete these 3 steps to get started with ShopBolt
          </p>
        </div>

        <Card className="mb-8">
          <Steps
            current={currentStep}
            items={steps.map((step) => ({
              title: step.title,
              description: step.description,
            }))}
            className="mb-8"
          />

          <div className="min-h-[400px]">
            {steps[currentStep].component}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrev}
              icon={<ArrowLeft size={16} />}
              className="flex items-center"
            >
              {currentStep === 0 ? 'Back to Welcome' : 'Previous'}
            </Button>

            <Space>
              <Button
                onClick={() => {
                  dispatch(completeSetup());
                  navigate('/dashboard');
                }}
                type="text"
                className="text-gray-500"
              >
                Skip for now
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                icon={<ArrowRight size={16} />}
                iconPosition="end"
                className="flex items-center"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupWizard;