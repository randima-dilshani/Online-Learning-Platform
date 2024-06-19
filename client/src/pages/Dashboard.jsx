import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Button, Typography, Space, Image, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState(
    JSON.parse(localStorage.getItem("enrolledCourses")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/course/getAllCourses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    // Display confirmation modal
    Modal.confirm({
      title: 'Enroll',
      content: 'Are you sure you want to enroll?',
      onOk: async () => {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/v1/enrollments/createEnrollment',
            { courseId },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const { enrollment } = response.data;
          console.log("enrollment>>>>>", enrollment);
          const updatedEnrolledCourses = [...enrolledCourses, enrollment.courseId];
          setEnrolledCourses(updatedEnrolledCourses);
          localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses));
          console.log(enrollment.courseId);
          navigate(`/courses/${enrollment.courseId}`);
        } catch (error) {
          console.error('Failed to enroll:', error);
        }
      },
      onCancel: () => {
        console.log('Enrollment cancelled');
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ backgroundColor: "#E6E6FA", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "80px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            width={50}
            src="https://thumbs.dreamstime.com/b/education-learning-logo-illustration-art-isolated-background-111644290.jpg"
            preview={false}
            style={{ marginRight: "10px" }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Title level={3} style={{ margin: 0 }}>Online Learning Platform</Title>
        </div>
        <Space>
          <Button type="default" onClick={handleProfile} icon={<UserOutlined />}>Profile</Button>
          <Button type="primary" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Button>
        </Space>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", margin: "20px 0", color: "#000000" }}>Explore Your Learning Journey!</Title>
        <div style={{ overflowY: "auto", height: "calc(100vh - 160px)" }}>
          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    marginBottom: "15px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {course.image && (
                    <div style={{ height: "200px" }}>
                      <img
                        alt="course"
                        src={`http://localhost:8080/${course.image}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  <h3
                    style={{
                      textAlign: "justify",
                      marginBottom: "10px",
                      marginTop: "10px",
                      wordWrap: "break-word",
                    }}
                  >
                    {course.courseName}
                  </h3>
                  <h3
                    style={{
                      textAlign: "justify",
                      marginBottom: "10px",
                      marginTop: "10px",
                      wordWrap: "break-word",
                    }}
                  >
                    {course.courseTitle}
                  </h3>
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
                    {enrolledCourses.includes(course._id) ? (
                      <>
                        <Button
                          type="default"
                          block
                          style={{
                            backgroundColor: "#A9A9A9",
                            borderColor: "#A9A9A9",
                            color: "#FFFFFF",
                            width: "100px",
                          }}
                          disabled
                        >
                          Enrolled
                        </Button>
                        <Button
                          type="primary"
                          block
                          onClick={() => navigate(`/courses/${course._id}`)}
                          style={{
                            backgroundColor: "#0000FF",
                            borderColor: "#0000FF",
                            color: "#FFFFFF",
                            width: "100px",
                          }}
                        >
                          View
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="primary"
                        block
                        onClick={() => handleEnroll(course._id)}
                        style={{
                          backgroundColor: "#B22222",
                          borderColor: "#B22222",
                          color: "#FFFFFF",
                          width: "150px",
                        }}
                      >
                        Enroll to Course
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
