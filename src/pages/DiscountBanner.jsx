import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Table, Button, Space, Switch, Modal, Form, Input, ColorPicker, Select, Row, Col, Slider } from 'antd';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { addBanner, updateBanner, deleteBanner, toggleBanner, setPreviewBanner } from '../store/slices/bannerSlice';
import BannerPreview from '../components/BannerPreview';

const DiscountBanner = () => {
  const dispatch = useDispatch();
  const { banners, previewBanner } = useSelector((state) => state.banner);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [form] = Form.useForm();

  const positionOptions = [
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Fixed Top', value: 'fixed-top' },
    { label: 'Fixed Bottom', value: 'fixed-bottom' },
  ];

  const animationOptions = [
    { label: 'None', value: 'none' },
    { label: 'Slide Down', value: 'slide-down' },
    { label: 'Fade In', value: 'fade-in' },
    { label: 'Bounce', value: 'bounce' },
  ];

  const fontWeightOptions = [
    { label: 'Normal', value: 'normal' },
    { label: 'Bold', value: 'bold' },
    { label: 'Extra Bold', value: '800' },
  ];

  const columns = [
    {
      title: 'Preview',
      key: 'preview',
      width: 200,
      render: (_, record) => (
        <div
          className="px-3 py-2 rounded text-sm truncate max-w-[180px]"
          style={{
            backgroundColor: record.backgroundColor,
            color: record.textColor,
            fontSize: `${record.fontSize}px`,
            fontWeight: record.fontWeight,
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
      width: 150,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: 120,
      render: (position) => (
        <span className="capitalize">{position.replace('-', ' ')}</span>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 150,
      render: (link) => (
        <span className="text-blue-500 truncate block max-w-[130px]" title={link}>
          {link || 'No link'}
        </span>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (_, record) => (
        <Switch
          checked={record.enabled}
          onChange={() => dispatch(toggleBanner(record.id))}
          size="small"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
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
    setEditingBanner(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    form.setFieldsValue(banner);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Banner',
      content: 'Are you sure you want to delete this banner?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => dispatch(deleteBanner(id)),
    });
  };

  const handlePreview = (banner) => {
    dispatch(setPreviewBanner(banner));
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBanner) {
        dispatch(updateBanner({ ...editingBanner, ...values }));
      } else {
        dispatch(addBanner(values));
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error saving banner:', error);
    }
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    if (values.name && values.text) {
      dispatch(setPreviewBanner({
        ...values,
        backgroundColor: values.backgroundColor || '#ff4d4f',
        textColor: values.textColor || '#ffffff',
        position: values.position || 'top',
        fontSize: values.fontSize || 14,
        fontWeight: values.fontWeight || 'normal',
        padding: values.padding || 12,
        animation: values.animation || 'none',
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discount Banner</h1>
          <p className="text-gray-600">Create promotional banners for your store</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
          className="bg-shopify-500"
        >
          Add Banner
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={14}>
          <Card title="Banners" className="h-full">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={banners}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
                size="middle"
              />
            </div>
          </Card>
        </Col>
        
        <Col xs={24} xl={10}>
          <div className="sticky top-6">
            <BannerPreview banner={previewBanner} />
          </div>
        </Col>
      </Row>

      <Modal
        title={editingBanner ? 'Edit Banner' : 'Add New Banner'}
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
            position: 'top',
            fontSize: 14,
            fontWeight: 'normal',
            padding: 12,
            animation: 'none',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Banner Name"
                rules={[{ required: true, message: 'Please enter banner name' }]}
              >
                <Input placeholder="e.g., Holiday Sale" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="link" label="Link URL">
                <Input placeholder="e.g., /collections/sale" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="text"
            label="Banner Text"
            rules={[{ required: true, message: 'Please enter banner text' }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="e.g., 🎄 Holiday Sale - 30% OFF Everything! Use code: HOLIDAY30"
            />
          </Form.Item>

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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="position" label="Position">
                <Select options={positionOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="animation" label="Animation">
                <Select options={animationOptions} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="fontSize" label="Font Size (px)">
                <Slider min={10} max={24} marks={{ 10: '10px', 16: '16px', 24: '24px' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="fontWeight" label="Font Weight">
                <Select options={fontWeightOptions} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="padding" label="Padding (px)">
                <Slider min={8} max={24} marks={{ 8: '8px', 16: '16px', 24: '24px' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default DiscountBanner;