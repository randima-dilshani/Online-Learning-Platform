import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Button, Table, message, Popconfirm, Input, Typography } from 'antd';
import Logo from '../../componenets/Sidebar/Logo';
import MenuList from '../../componenets/Sidebar/MenuList';

const { Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Function to fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/enrollments/getAllEnrollments');
      setEnrollments(response.data); 
      setFilteredEnrollments(response.data); 
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    }
  };

  // Function to handle search
  const handleSearch = (value) => {
    const filtered = enrollments.filter(enrollment =>
      enrollment.courseId.courseName.toLowerCase().includes(value.toLowerCase()) ||
      enrollment.studentId.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEnrollments(filtered); 
  };

  // Table columns definition
  const columns = [
    {
      title: 'Student Name',
      dataIndex: ['studentId', 'userName'],
      key: 'studentName',
    },
    {
      title: 'Student Email',
      dataIndex: ['studentId', 'email'],
      key: 'studentEmail',
    },
    {
      title: 'Course Name',
      dataIndex: ['courseId', 'courseName'],
      key: 'courseName',
    },
    {
      title: 'Course Title',
      dataIndex: ['courseId', 'courseTitle'],
      key: 'courseTitle',
    },
    {
      title: 'Enrollment Date',
      dataIndex: 'enrollmentDate',
      key: 'enrollmentDate',
      render: (date) => new Date(date).toLocaleDateString(), 
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Popconfirm
            title={record.status === 'Enroll' ? "Are you sure you want to unenroll?" : "Are you sure you want to enroll?"}
            onConfirm={() => handleUpdateStatus(record._id, record.status === 'Enroll' ? 'UnEnroll' : 'Enroll')} 
            cancelText="No"
          >
            <Button type="primary" style={{ backgroundColor: record.status === 'Enroll' ? 'red' : 'green', borderColor: record.status === 'Enroll' ? 'red' : 'green' }}>
              {record.status === 'Enroll' ? 'Unenroll' : 'Enroll'}
            </Button>
          </Popconfirm>
          &nbsp;
          <Popconfirm
            title="Are you sure you want to delete this enrollment?"
            onConfirm={() => handleDeleteEnrollment(record._id)} 
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              block
              style={{
                backgroundColor: "#0000FF",
                borderColor: "#0000FF",
                color: "#FFFFFF",
                width: "100px",
              }}
            >
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo /> 
        <MenuList /> 
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <Title level={2}>Enrollment Management</Title>
          <Search
            placeholder="Search by course name or Student email"
            onSearch={handleSearch} 
            enterButton
            style={{ width: 400 }}
          />
        </div>
        <Table
          dataSource={filteredEnrollments} 
          columns={columns} 
          rowKey={(record) => record._id} 
          pagination={{ pageSize: 10 }} 
        />
      </Layout>
    </Layout>
  );
};

export default EnrollmentsTable;
