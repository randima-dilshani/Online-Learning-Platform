import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const CreateCourseForm = ({ open, setOpen, fetchCourses }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpen(false);
  };

  // Function to handle changes in the file upload
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Function to handle creating a new course
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("courseName", values.courseName);
      formData.append("courseTitle", values.courseTitle);
      formData.append("courseCode", values.courseCode);
      formData.append("courseDescription", values.courseDescription);
      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      await axios.post("http://localhost:8080/api/v1/course/createCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.resetFields();
      setFileList([]);
      setOpen(false);
      fetchCourses(); 
      message.success("Course created successfully");
    } catch (error) {
      console.error("Error creating course:", error);
      message.error("Failed to create course");
    }
  };

  return (
    <Modal
      title="Create Course"
      visible={open} 
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="courseName"
          label="Course Name"
          rules={[{ required: true, message: "Course name is required" }]}
        >
          <Input placeholder="Enter course name" />
        </Form.Item>
        <Form.Item
          name="courseTitle"
          label="Course Title"
          rules={[{ required: true, message: "Course title is required" }]}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>
        <Form.Item
          name="courseCode"
          label="Course Code"
          rules={[{ required: true, message: "Course code is required" }]}
        >
          <Input placeholder="Enter course code" />
        </Form.Item>
        <Form.Item
          name="courseDescription"
          label="Course Description"
          rules={[{ required: true, message: "Course description is required" }]}
        >
          <Input.TextArea placeholder="Enter course description" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Course Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={() => false} 
            onChange={handleUploadChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCourseForm;
