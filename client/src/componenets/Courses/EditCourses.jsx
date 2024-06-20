import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";

const EditCourses = ({ open, setOpen, courseId, fetchCourses }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  // Function to fetch course details
  const fetchCourseDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/course/getCourse/${id}`);
      form.setFieldsValue(response.data); 
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  // Function to handle form submission
  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields(); 
      await axios.put(`http://localhost:8080/api/v1/course/updateCourse/${courseId}`, values); // Update course
      setLoading(false);
      setOpen(false);
      fetchCourses(); 
      form.resetFields(); 
    } catch (error) {
      console.error("Error updating course:", error);
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false); 
    form.resetFields(); 
  };

  return (
    <Modal
      title="Edit Course"
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="courseName"
          label="Course Name"
          rules={[{ required: true, message: "Please input the course name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="courseTitle"
          label="Course Title"
          rules={[{ required: true, message: "Please input the course title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="courseCode"
          label="Course Code"
          rules={[{ required: true, message: "Please input the course code!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="courseDescription"
          label="Course Description"
          rules={[{ required: true, message: "Please input the course description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCourses;
