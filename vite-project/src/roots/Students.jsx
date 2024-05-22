import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import "../styles/Students.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    {
      /* Using async functions, grab existing information from our database*/
    }
    const fetchStudents = async () => {
      try {
        const grabInformation = await getDocs(collection(db, "Students"));
        const studentsList = [];
        grabInformation.forEach((doc) => {
          const data = doc.data();
          studentsList.push({
            id: doc.id,
            first: data.First,
            grade: data.Grade,
            last: data.Last,
            enrolledIn: data.enrolledIn,
          });
        });
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = () => {
    const filteredStudents = student.filter(
      (student) =>
        student.First.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.Last.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTeachers(filteredTeachers);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <div className="image-container">
        <img
          src="/homePageSchool.jpeg"
          alt="School Image"
          className="full-width-image"
        ></img>
        <div className="overlay"></div>
        <h1 className="studentScreenHeader">Student Directory</h1>
      </div>
      <div className="main-wrapper">
        <div className="left-container">
          <h1> All Students</h1>
          <p> Browse through the list of all Students</p>
          <div className="search">
            <input
              type="text"
              placeholder="Filter by name"
              // Must add onChange event handler for search functionality
            />
          </div>
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
          {/* Must provide an option where we can add students */}

          {/* Setting up how we would display student information through gridding */}
          <table className="student-list">
            <thead>
              <tr className="student-header">
                <th className="student-photo"> Student Photo</th>
                <th className="student-name">Name</th>
                <th className="student-grade">Grade</th>
                <th className="student-teacher">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr className="student-row" key={student.id}>
                  {/* Add Student photo*/}
                  <td className="student-photo"> </td>
                  <td className="student-name">{`${student.first} ${student.last}`}</td>
                  <td className="student-grade">{`${student.grade}`}</td>
                  <td className="student-teacher">{`Teacher: ${student.teacher}`}</td>
                </tr> 
              ))}
            </tbody>
          </table>
        </div>

        <div className="right-container">
          <h1> Student Information </h1>
          {/* Add Student Card that includes their grade and name */}

          <div className="student-specifics">
            <div className="student-info-containers"></div>
            <div className="academic-info">
              <h2>Academic Information </h2>
              <p> Enrolled In: </p>
              <p> Average Grade: </p>
              <p> Teacher Supervisor: </p>
            </div>
            <div className="contact-info">
              <h2> Contact Information </h2>
              <p> Parent: </p>
              <p> Legal Guardian Phone #: </p>
              <p> Email: </p>
            </div>
            <div className="personal-info">
              <h2> Personal Information</h2>
              <p> Pronouns: </p>
              <p> Birthday: </p>
              <p> Residence: </p>
            </div>
            <div className="update-student">
              <h2> Edit/Update Student</h2>
              {/* Must provide an option where we can remove/edit/update the student through a button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
