import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Typography, Image, Spin, Layout } from "antd";

const { Title, Text } = Typography;
const { Content } = Layout;

const CourseView = () => {
  const { courseId } = useParams(); 
  const [course, setCourse] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/course/getCourse/${courseId}`
        );
        setCourse(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false); 
      }
    };

    fetchCourse();
  }, [courseId]);

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </Layout>
    );
  }

  // Display error message if no course data is found
  if (!course) {
    return (
      <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Text type="danger">Error loading course data.</Text>
      </Layout>
    );
  }

  // Render course details once data is fetched
  return (
    <Layout style={{ padding: "20px", minHeight: "100vh" }}>
      <Content>
        <Card
          title={<Title level={2}>{course.courseName}</Title>}
          bordered={false}
          style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}
        >
          <Image
            src={`http://localhost:8080/${course.image}`} // Image source URL
            alt={course.courseName}
            style={{ marginBottom: "20px", width: "100%" }} 
          />
          <Title level={4}>Code: {course.courseCode}</Title>
          <Title level={4}>Course Title: {course.courseTitle}</Title>
          <Text>{course.courseDescription}</Text>
        </Card>
      </Content>
    </Layout>
  );
};

export default CourseView;
