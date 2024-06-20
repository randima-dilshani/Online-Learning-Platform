import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Button, Table, Space, Popconfirm, message, Affix, Popover,Typography,Input } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined,SearchOutlined } from "@ant-design/icons";
import Logo from "../../componenets/Sidebar/Logo"; 
import MenuList from "../../componenets/Sidebar/MenuList"; 
import CreateCourses from "../Courses/CreateCourses"; 
import EditCourses from "../Courses/EditCourses"; 

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); 
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchValue, setSearchValue] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(); 
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/course/getAllCourses"
      );
      // Setting fetched courses to state
      setCourses(response.data); 
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    return `http://localhost:8080/${imagePath}`;
  };

  // Column definitions for Ant Design Table
  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (text) => (
        <img
          src={getImageUrl(text)}
          alt="course"
          style={{ maxWidth: 50, maxHeight: 50 }}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "courseDescription",
      key: "courseDescription",
      width: 150,
      ellipsis: true,
      render: (text) => (
        <Popover
          content={<div style={{ maxWidth: 200 }}>{text}</div>}
          title="Course Description"
          trigger="click"
        >
          <div style={{ cursor: "pointer" }}>
            {text.length > 100 ? `${text.slice(0, 100)}... ` : text}
            {text.length > 100 && <a>See more</a>}
          </div>
        </Popover>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="primary" style={{ backgroundColor: "#A9A9A9", borderColor: "#A9A9A9" }} icon={<EyeOutlined />} onClick={() => handleView(record._id)} />
          <Button type="primary" style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }} icon={<EditOutlined />} onClick={() => handleEdit(record._id)} />
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Redirects to specific course page
  const handleView = (courseId) => {
    navigate(`/specificcourse/${courseId}`);
  };

 
  const handleEdit = (courseId) => {
    setSelectedCourseId(courseId);
    setOpenEditModal(true);
  };

  // Deletes the selected course
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/course/deleteCourse/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId)); 
      message.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("Failed to delete course");
    }
  };

 
  const handleCreate = () => {
    setOpenCreateModal(true); 
  };
     
  // Filtering courses based on search input
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchValue.toLowerCase())
  );

 
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content className="p-6" style={{ paddingTop: 50 }}>
          <Affix style={{ position: "absolute", top: 10, right: 10 }}>
            <Button
              type="primary"
              icon={<PlusOutlined style={{ color: 'black' }} />}
              onClick={handleCreate}
              style={{ backgroundColor: '#4169E1', borderColor: '#4169E1', color: 'black' }}>
              Create
            </Button>
          </Affix>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Title level={2}>Courses Management</Title>
            <Search
              placeholder="Search By Course Name"
              onSearch={handleSearch}
              enterButton
              style={{ width: 300 }}
            />
          </div>
          <Table dataSource={filteredCourses} columns={columns} rowKey="_id" />
        </Content>
      </Layout>
      <CreateCourses open={openCreateModal} setOpen={setOpenCreateModal} fetchCourses={fetchCourses} />
      <EditCourses open={openEditModal} setOpen={setOpenEditModal} courseId={selectedCourseId} fetchCourses={fetchCourses} />
    </Layout>
  );
};

export default Dashboard;
