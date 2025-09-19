import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { User } from './AdvancedUserCard';

interface EditUserModalProps {
  user: User | null;
  visible: boolean;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, visible, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        companyName: user.company.name
      });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (user) {
        const updatedUser: User = {
          ...user,
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          website: values.website,
          address: {
            street: values.street,
            suite: values.suite,
            city: values.city,
            zipcode: values.zipcode
          },
          company: {
            name: values.companyName
          }
        };
        onSave(updatedUser);
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user?.name,
          username: user?.username,
          email: user?.email,
          phone: user?.phone,
          website: user?.website,
          street: user?.address?.street,
          suite: user?.address?.suite,
          city: user?.address?.city,
          zipcode: user?.address?.zipcode,
          companyName: user?.company?.name
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input the phone!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: 'Please input the website!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item label="Address">
          <Input.Group compact>
            <Form.Item
              name="street"
              style={{ width: '50%' }}
              rules={[{ required: true, message: 'Street is required!' }]}
            >
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item
              name="suite"
              style={{ width: '50%' }}
              rules={[{ required: true, message: 'Suite is required!' }]}
            >
              <Input placeholder="Suite" />
            </Form.Item>
          </Input.Group>
          <Input.Group compact style={{ marginTop: 8 }}>
            <Form.Item
              name="city"
              style={{ width: '50%' }}
              rules={[{ required: true, message: 'City is required!' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="zipcode"
              style={{ width: '50%' }}
              rules={[{ required: true, message: 'Zipcode is required!' }]}
            >
              <Input placeholder="Zipcode" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true, message: 'Please input the company name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;