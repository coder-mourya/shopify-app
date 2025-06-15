import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Table, Button, Space, Switch, Modal, Form, Input, ColorPicker, Select, Row, Col, Tag } from 'antd';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { addBadge, updateBadge, deleteBadge, toggleBadge, setPreviewBadge } from '../store/slices/badgeSlice';
import { dummyProducts } from '../data/dummyData';
import BadgePreview from '../components/BadgePreview';

const BadgeManager = () => {
  const dispatch = useDispatch();
  const { badges, previewBadge } = useSelector((state) => state.badge);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [form] = Form.useForm();

  const positionOptions = [
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
  ];

  const columns = [
    {
      title: 'Badge',
      key: 'badge',
      render: (_, record) => (
        <div
          className="px-2 py-1 rounded text-xs font-medium inline-block"
          style={{
            backgroundColor: record.backgroundColor,
            color: record.color,
          }}
        >
          {record.text}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Products',
      key: 'products',
      render: (_, record) => (
        <span>{record.products.length} products</span>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => (
        <Tag color="blue">{position.replace('-', ' ')}</Tag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Switch
          checked={record.enabled}
          onChange={() => dispatch(toggleBadge(record.id))}
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
    setEditingBadge(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (badge) => {
    setEditingBadge(badge);
    form.setFieldsValue(badge);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Badge',
      content: 'Are you sure you want to delete this badge?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => dispatch(deleteBadge(id)),
    });
  };

  const handlePreview = (badge) => {
    dispatch(setPreviewBadge(badge));
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBadge) {
        dispatch(updateBadge({ ...editingBadge, ...values }));
      } else {
        dispatch(addBadge(values));
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error saving badge:', error);
    }
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    if (values.name && values.text) {
      dispatch(setPreviewBadge({
        ...values,
        color: values.color || '#ffffff',
        backgroundColor: values.backgroundColor || '#ff4d4f',
        position: values.position || 'top-right',
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badge Manager</h1>
          <p className="text-gray-600">Create and manage product badges</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
          className="bg-shopify-500"
        >
          Add Badge
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Badges">
            <Table
              columns={columns}
              dataSource={badges}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <BadgePreview badge={previewBadge} />
        </Col>
      </Row>

      <Modal
        title={editingBadge ? 'Edit Badge' : 'Add New Badge'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          initialValues={{
            color: '#ffffff',
            backgroundColor: '#ff4d4f',
            position: 'top-right',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Badge Name"
                rules={[{ required: true, message: 'Please enter badge name' }]}
              >
                <Input placeholder="e.g., Hot Deal" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="text"
                label="Badge Text"
                rules={[{ required: true, message: 'Please enter badge text' }]}
              >
                <Input placeholder="e.g., HOT" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="color" label="Text Color">
                <ColorPicker showText className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="backgroundColor" label="Background Color">
                <ColorPicker showText className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="position" label="Position">
            <Select options={positionOptions} />
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

export default BadgeManager;