import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../componenets/Sidebar/Logo";
import MenuList from "../componenets/Sidebar/MenuList";

const { Sider, Content } = Layout;
const { Text } = Typography;

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

  const handleEnroll = (courseId) => {
    const updatedEnrolledCourses = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrolledCourses);
    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(updatedEnrolledCourses)
    );
    navigate(`/courses/${courseId}`);
  };

  const handleView = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

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
                      {" "}
                      {/* Fixed height to maintain consistency */}
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
                  <div style={{ marginTop: "10px" }}>
                    {enrolledCourses.includes(course._id) ? (
                      <>
                        <Button type="default" disabled>
                          Enrolled
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => handleView(course._id)}
                          style={{ marginLeft: "10px" }}
                        >
                          View
                        </Button>
                      </>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => handleEnroll(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;