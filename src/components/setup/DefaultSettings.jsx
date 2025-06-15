import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Form, ColorPicker, Select, Input } from 'antd';
import { Palette, MapPin, Type } from 'lucide-react';
import { updateDefaultSettings } from '../../store/slices/setupSlice';

const DefaultSettings = () => {
  const dispatch = useDispatch();
  const { defaultSettings } = useSelector((state) => state.setup);

  const handleSettingChange = (key, value) => {
    dispatch(updateDefaultSettings({ [key]: value }));
  };

  const positionOptions = [
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Default Settings
        </h2>
        <p className="text-gray-600">
          Set your default colors and positions for all widgets
        </p>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Colors" className="h-full">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <Form.Item label="Primary Color" className="mb-2">
                    <ColorPicker
                      value={defaultSettings.primaryColor}
                      onChange={(color) => handleSettingChange('primaryColor', color.toHexString())}
                      showText
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <Form.Item label="Secondary Color" className="mb-2">
                    <ColorPicker
                      value={defaultSettings.secondaryColor}
                      onChange={(color) => handleSettingChange('secondaryColor', color.toHexString())}
                      showText
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Type className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <Form.Item label="Text Color" className="mb-2">
                    <ColorPicker
                      value={defaultSettings.textColor}
                      onChange={(color) => handleSettingChange('textColor', color.toHexString())}
                      showText
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Position" className="h-full">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <Form.Item label="Default Position" className="mb-2">
                  <Select
                    value={defaultSettings.position}
                    onChange={(value) => handleSettingChange('position', value)}
                    options={positionOptions}
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Preview" className="h-full">
            <div className="space-y-4">
              <div
                className="relative w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <div
                  className={`absolute px-3 py-1 rounded text-sm font-medium ${
                    defaultSettings.position === 'top-left' ? 'top-2 left-2' :
                    defaultSettings.position === 'top-right' ? 'top-2 right-2' :
                    defaultSettings.position === 'bottom-left' ? 'bottom-2 left-2' :
                    'bottom-2 right-2'
                  }`}
                  style={{
                    backgroundColor: defaultSettings.primaryColor,
                    color: defaultSettings.textColor,
                  }}
                >
                  Sample Badge
                </div>
                <span className="text-gray-500 text-sm">Product Preview</span>
              </div>
              
              <div
                className="w-full h-8 rounded flex items-center justify-center text-sm font-medium"
                style={{
                  backgroundColor: defaultSettings.secondaryColor,
                  color: defaultSettings.textColor,
                }}
              >
                Sample Banner
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          These settings will be applied to all new widgets you create
        </p>
      </div>
    </div>
  );
};

export default DefaultSettings;