import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Form, Switch, Select, ColorPicker, Slider, Row, Col, Button } from 'antd';
import { updateStickyCart, updateCartDrawer } from '../store/slices/cartSlice';
import CartPreview from '../components/CartPreview';

const CartSettings = () => {
  const dispatch = useDispatch();
  const { stickyCart, cartDrawer } = useSelector((state) => state.cart);
  const [form] = Form.useForm();

  const positionOptions = [
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
  ];

  const styleOptions = [
    { label: 'Floating', value: 'floating' },
    { label: 'Fixed', value: 'fixed' },
    { label: 'Slide', value: 'slide' },
  ];

  const animationOptions = [
    { label: 'None', value: 'none' },
    { label: 'Slide', value: 'slide' },
    { label: 'Fade', value: 'fade' },
    { label: 'Bounce', value: 'bounce' },
  ];

  const drawerPositionOptions = [
    { label: 'Right', value: 'right' },
    { label: 'Left', value: 'left' },
  ];

  const handleStickyCartChange = (field, value) => {
    dispatch(updateStickyCart({ [field]: value }));
  };

  const handleCartDrawerChange = (field, value) => {
    dispatch(updateCartDrawer({ [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cart Settings</h1>
        <p className="text-gray-600">Configure your cart experience</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <div className="space-y-6">
            {/* Sticky Cart Settings */}
            <Card title="Sticky Cart">
              <Form layout="vertical" form={form}>
                <div className="space-y-4">
                  <Form.Item label="Enable Sticky Cart">
                    <Switch
                      checked={stickyCart.enabled}
                      onChange={(checked) => handleStickyCartChange('enabled', checked)}
                    />
                  </Form.Item>

                  {stickyCart.enabled && (
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Position">
                            <Select
                              value={stickyCart.position}
                              onChange={(value) => handleStickyCartChange('position', value)}
                              options={positionOptions}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Style">
                            <Select
                              value={stickyCart.style}
                              onChange={(value) => handleStickyCartChange('style', value)}
                              options={styleOptions}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Background Color">
                            <ColorPicker
                              value={stickyCart.backgroundColor}
                              onChange={(color) => handleStickyCartChange('backgroundColor', color.toHexString())}
                              showText
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Text Color">
                            <ColorPicker
                              value={stickyCart.textColor}
                              onChange={(color) => handleStickyCartChange('textColor', color.toHexString())}
                              showText
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="Border Radius">
                        <Slider
                          value={stickyCart.borderRadius}
                          onChange={(value) => handleStickyCartChange('borderRadius', value)}
                          min={0}
                          max={50}
                          marks={{ 0: '0px', 25: '25px', 50: '50px' }}
                        />
                      </Form.Item>

                      <Form.Item label="Animation">
                        <Select
                          value={stickyCart.animation}
                          onChange={(value) => handleStickyCartChange('animation', value)}
                          options={animationOptions}
                        />
                      </Form.Item>

                      <div className="space-y-2">
                        <Form.Item label="Display Options" className="mb-0">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Show Product Count</span>
                              <Switch
                                checked={stickyCart.showProductCount}
                                onChange={(checked) => handleStickyCartChange('showProductCount', checked)}
                                size="small"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Show Total Price</span>
                              <Switch
                                checked={stickyCart.showTotal}
                                onChange={(checked) => handleStickyCartChange('showTotal', checked)}
                                size="small"
                              />
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            </Card>

            {/* Cart Drawer Settings */}
            <Card title="Cart Drawer">
              <Form layout="vertical">
                <div className="space-y-4">
                  <Form.Item label="Enable Cart Drawer">
                    <Switch
                      checked={cartDrawer.enabled}
                      onChange={(checked) => handleCartDrawerChange('enabled', checked)}
                    />
                  </Form.Item>

                  {cartDrawer.enabled && (
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item label="Position">
                            <Select
                              value={cartDrawer.position}
                              onChange={(value) => handleCartDrawerChange('position', value)}
                              options={drawerPositionOptions}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Width (px)">
                            <Slider
                              value={cartDrawer.width}
                              onChange={(value) => handleCartDrawerChange('width', value)}
                              min={300}
                              max={600}
                              marks={{ 300: '300px', 400: '400px', 600: '600px' }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item label="Free Shipping Threshold ($)">
                        <Slider
                          value={cartDrawer.freeShippingThreshold}
                          onChange={(value) => handleCartDrawerChange('freeShippingThreshold', value)}
                          min={0}
                          max={200}
                          marks={{ 0: '$0', 50: '$50', 100: '$100', 200: '$200' }}
                        />
                      </Form.Item>

                      <div className="space-y-2">
                        <Form.Item label="Features" className="mb-0">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Show Product Recommendations</span>
                              <Switch
                                checked={cartDrawer.showRecommendations}
                                onChange={(checked) => handleCartDrawerChange('showRecommendations', checked)}
                                size="small"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Show Free Shipping Bar</span>
                              <Switch
                                checked={cartDrawer.showShippingBar}
                                onChange={(checked) => handleCartDrawerChange('showShippingBar', checked)}
                                size="small"
                              />
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            </Card>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <CartPreview stickyCart={stickyCart} cartDrawer={cartDrawer} />
        </Col>
      </Row>
    </div>
  );
};

export default CartSettings;