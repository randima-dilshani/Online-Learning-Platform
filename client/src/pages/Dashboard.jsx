import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Flex, Progress } from "antd";
import {
  FaTasks,
  FaCheckCircle,
  FaSpinner,
  FaClipboardList,
} from "react-icons/fa";
import Logo from "../componenets/Sidebar/Logo";
import MenuList from "../componenets/Sidebar/MenuList";

const { Sider, Content } = Layout;
const Dashboard = () => {
const [courses, setCourses] = useState([]);

useEffect(() => {
  // Fetch tasks from the database
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/course/getAllCourses"
      ); // Adjust the URL based on your API endpoint
      setCourses(response.data);
    } catch (error) {
      // Handle error
    }
  };

  fetchCourses();
}, []);

   
  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content className="p-6">
          <Row gutter={[16, 16]}>
            
            {courses.map((course) => (
                
              <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={course.courseName}
                  bordered={false}
                  className="bg-white"
                  cover={<img alt={course.courseName} src={course.courseImage} />}
                >
                  <p>Code: {course.courseCode}</p>
                  <p>Title: {course.courseTitle}</p>
                  <p>{course.courseDescription}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
        {/* Placeholder for the task list component */}
        <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
          <h1>Task List Placeholder</h1>
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;