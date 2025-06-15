import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Table, Button, Space, Switch, Modal, Form, Input, ColorPicker, Select, Row, Col, DatePicker, Slider } from 'antd';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import dayjs from 'dayjs';
import { addTimer, updateTimer, deleteTimer, toggleTimer, setPreviewTimer } from '../store/slices/timerSlice';
import { dummyProducts } from '../data/dummyData';
import TimerPreview from '../components/TimerPreview';

const CountdownTimer = () => {
  const dispatch = useDispatch();
  const { timers, previewTimer } = useSelector((state) => state.timer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTimer, setEditingTimer] = useState(null);
  const [form] = Form.useForm();

  const styleOptions = [
    { label: 'Modern', value: 'modern' },
    { label: 'Classic', value: 'classic' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Bold', value: 'bold' },
  ];

  const positionOptions = [
    { label: 'Product Page', value: 'product-page' },
    { label: 'Collection Page', value: 'collection-page' },
    { label: 'Cart Page', value: 'cart-page' },
    { label: 'Popup', value: 'popup' },
  ];

  const columns = [
    {
      title: 'Timer',
      key: 'timer',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <div
            className="px-2 py-1 rounded text-xs font-mono"
            style={{
              backgroundColor: record.backgroundColor,
              color: record.textColor,
            }}
          >
            02:14:35:42
          </div>
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => dayjs(endTime).format('MMM DD, YYYY HH:mm'),
    },
    {
      title: 'Products',
      key: 'products',
      render: (_, record) => (
        <span>{record.products.length} products</span>
      ),
    },
    {
      title: 'Style',
      dataIndex: 'style',
      key: 'style',
      render: (style) => (
        <span className="capitalize">{style}</span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.enabled}
          onChange={() => dispatch(toggleTimer(record.id))}
          size="small"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => handlePreview(record)}
            className="text-blue-500"
          />
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
            className="text-green-500"
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record.id)}
            className="text-red-500"
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingTimer(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (timer) => {
    setEditingTimer(timer);
    form.setFieldsValue({
      ...timer,
      endTime: dayjs(timer.endTime),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Timer',
      content: 'Are you sure you want to delete this timer?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => dispatch(deleteTimer(id)),
    });
  };

  const handlePreview = (timer) => {
    dispatch(setPreviewTimer(timer));
  };

  const handleSubmit = async (values) => {
    try {
      const timerData = {
        ...values,
        endTime: values.endTime.toISOString(),
      };
      
      if (editingTimer) {
        dispatch(updateTimer({ ...editingTimer, ...timerData }));
      } else {
        dispatch(addTimer(timerData));
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error saving timer:', error);
    }
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    if (values.name && values.endTime) {
      dispatch(setPreviewTimer({
        ...values,
        endTime: values.endTime ? values.endTime.toISOString() : null,
        backgroundColor: values.backgroundColor || '#ff4d4f',
        textColor: values.textColor || '#ffffff',
        style: values.style || 'modern',
        position: values.position || 'product-page',
        fontSize: values.fontSize || 18,
        showDays: values.showDays !== false,
        showHours: values.showHours !== false,
        showMinutes: values.showMinutes !== false,
        showSeconds: values.showSeconds !== false,
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Countdown Timer</h1>
          <p className="text-gray-600">Create urgency with countdown timers</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
          className="bg-shopify-500"
        >
          Add Timer
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Timers">
            <Table
              columns={columns}
              dataSource={timers}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <TimerPreview timer={previewTimer} />
        </Col>
      </Row>

      <Modal
        title={editingTimer ? 'Edit Timer' : 'Add New Timer'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          initialValues={{
            backgroundColor: '#ff4d4f',
            textColor: '#ffffff',
            style: 'modern',
            position: 'product-page',
            fontSize: 18,
            showDays: true,
            showHours: true,
            showMinutes: true,
            showSeconds: true,
            endTime: dayjs().add(7, 'days'),
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Timer Name"
                rules={[{ required: true, message: 'Please enter timer name' }]}
              >
                <Input placeholder="e.g., Flash Sale Timer" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[{ required: true, message: 'Please select end time' }]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="style" label="Style">
                <Select options={styleOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="position" label="Position">
                <Select options={positionOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="backgroundColor" label="Background Color">
                <ColorPicker showText className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="textColor" label="Text Color">
                <ColorPicker showText className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="fontSize" label="Font Size (px)">
            <Slider min={12} max={32} marks={{ 12: '12px', 18: '18px', 24: '24px', 32: '32px' }} />
          </Form.Item>

          <Form.Item label="Display Options">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name="showDays" valuePropName="checked" className="mb-0">
                  <Switch size="small" /> Days
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="showHours" valuePropName="checked" className="mb-0">
                  <Switch size="small" /> Hours
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="showMinutes" valuePropName="checked" className="mb-0">
                  <Switch size="small" /> Minutes
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="showSeconds" valuePropName="checked" className="mb-0">
                  <Switch size="small" /> Seconds
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="products" label="Apply to Products">
            <Select
              mode="multiple"
              placeholder="Select products"
              options={dummyProducts.map(product => ({
                label: product.title,
                value: product.id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CountdownTimer;