import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Table, Button, Space, Typography, Input, Modal, Form } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Logo from "../../componenets/Sidebar/Logo";
import MenuList from "../../componenets/Sidebar/MenuList";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const DisplayAllStudents = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getallusers"
      );
      console.log("response", response);
      if (Array.isArray(response.data.users)) {
        const filteredUsers = response.data.users.filter(user => user.role === 'user');
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users from the database:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    console.log("Deleting", record);
    try {
      await axios.delete(`http://localhost:8080/api/v1/user/deleteProfile/${record._id}`);
      // After successful deletion, refetch the users
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Edited values:', values);
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields(); 
      // After successful edit, refetch the users
      fetchUsers();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "NIC",
      dataIndex: "NIC",
      key: "NIC",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style = {{backgroundColor: "#1890ff", borderColor: "#1890ff" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            style = {{backgroundColor: "#f5222d", borderColor: "#f5222d" }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
    
  ];

  return (
    <Layout>
       <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Content style={{ padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={2}>Students Management</Title>
        </div>
        <div style={{ marginBottom: 20, textAlign: "center" }}>
          <Search
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
            enterButton={<SearchOutlined />}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card title="" bordered={false}>
                <Table dataSource={filteredUsers} pagination={false} columns={columns} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter role' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="NIC"
            label="NIC"
            rules={[{ required: true, message: 'Please enter NIC' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default DisplayAllStudents;
