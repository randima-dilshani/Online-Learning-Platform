import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnrollmentsTable = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/enrollments/getAllEnrollments');
        const enrollmentsData = response.data;

        enrollmentsData.forEach(enrollment => {
          console.log("Enrollment:", enrollment);
        });

        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Student Email</th>
          <th>Course ID</th>
          <th>Course Name</th>
          <th>Course Description</th>
          <th>Enrollment Date</th>
        </tr>
      </thead>
      <tbody>
        
        {enrollments.map((enrollment) => (
            console.log("enrollment>>>>>>", enrollment),
            //console.log(enrollment.courseId._id),
          <tr key={enrollment._id}>
            <td>{enrollment.studentId._id}</td>
            <td>{enrollment.studentId.userName}</td>
            <td>{enrollment.studentId.email}</td>
            <td>{enrollment.courseId._id}</td>
            <td>{enrollment.courseId.courseName}</td>
            <td>{enrollment.courseId.courseTitle}</td>
            <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
          </tr>
          
        ))}
        
      </tbody>
    </table>
  );
};

export default EnrollmentsTable;
