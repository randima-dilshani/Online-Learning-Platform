import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";

const EditUser = ({ open, setOpen, user, fetchUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await axios.put(`http://localhost:8080/api/v1/user/updateUser/${user.id}`, values);
      setLoading(false);
      setOpen(false);
      fetchUsers();
      form.resetFields();
    } catch (error) {
      console.error("Error updating user:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Edit User"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="userName"
          label="User Name"
          rules={[{ required: true, message: "Please input the user name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please input the role!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: "Please input the phone number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="NIC"
          label="NIC"
          rules={[{ required: true, message: "Please input the NIC!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
