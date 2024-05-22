import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // When adding a new student:
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Grade, setGrade] = useState(0);
  const [Teacher, setTeacher] = useState("");
  const [enrolledIn, setEnrolledIn] = useState(""); // assuming it's a string for now

  const fetchStudents = async () => {
    try {
      const grabInformation = await getDocs(collection(db, "Students"));
      const studentsList = [];
      grabInformation.forEach((doc) => {
        const data = doc.data();
        studentsList.push({
          id: doc.id,
          First: data.First,
          Last: data.Last,
          Grade: data.Grade,
          enrolledIn: data.enrolledIn,
          Teacher: data.Teacher,
        });
      });
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching student data: ", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If search query is empty, fetch all students again
      fetchStudents();
    } else {
      // Filter students based on the search query
      const filteredStudents = students.filter(
        (student) =>
          student.First.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.Last.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredStudents.length === 0) {
        // If no matching students found, set an empty array
        setStudents([]);
      } else {
        // Set filtered students
        setStudents(filteredStudents);
      }
    }
  };

  const handleStudentClick = (student) => {
    // Handle whether user wants to learn more about specific student
    setSelectedStudent(student);
  };

  const handleAddOption = () => {
    // Handle whether user wants to add a new student
    setIsAddingStudent((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do not allow information to pass if user has not answered the entire form
    if (!First || !Last || Grade === 0 || !Teacher || !enrolledIn) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Students"), {
        First,
        Last,
        Grade,
        Teacher,
        enrolledIn,
      });
      console.log("Document written with ID: ", docRef.id);
      fetchStudents();

      // Clear form fields after submission for better user experience
      setFirst("");
      setLast("");
      setGrade(0);
      setTeacher("");
      setEnrolledIn("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // TODO: Handlers for the update/delete of students
  const handleDelete = async () => {
    if (selectedStudent) {
    }
  };

  const handleEdit = async () => {
    if (selectedStudent) {
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
            {/* onChange to update the changes that user inputted so that the list only display only the students that match the search query*/}
            <input
              type="text"
              placeholder="Filter by name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch} variant="contained">
              Search
            </Button>
          </div>

          {/* Provide an option where we can add students */}
          <div className="addStudent-option">
            <figcaption onClick={handleAddOption}>
              Can't find your student? {isAddingStudent ? "▲" : "▼"}
            </figcaption>
            <br />
            {isAddingStudent && (
              <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <input
                  type="text"
                  value={First}
                  onChange={(e) => setFirst(e.target.value)}
                ></input>
                <br />
                <label>Last Name: </label>
                <input
                  type="text"
                  value={Last}
                  onChange={(e) => setLast(e.target.value)}
                ></input>
                <br />
                <label>Grade: </label>
                <input
                  type="number"
                  value={Grade}
                  onChange={(e) => setGrade(parseInt(e.target.value))}
                ></input>
                <br />
                <label>Teacher: </label>
                <input
                  type="text"
                  value={Teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                ></input>
                <br />
                <label>Enrolled In: </label>
                <input
                  type="text"
                  value={enrolledIn}
                  onChange={(e) => setEnrolledIn(e.target.value)}
                ></input>
                <br />
                <Button type="submit">Add Student</Button>
              </form>
            )}
          </div>

          {/* Setting up how we would display student information through gridding */}
          <table className="student-list">
            <thead>
              <tr className="student-header">
                <th className="student-photo"> Photo </th>
                <th className="student-name">Name</th>
                <th className="student-grade">Grade</th>
                <th className="student-teacher">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  className="student-row"
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                >
                  <td className="student-photo">
                    <EmojiEmotionsIcon />
                  </td>
                  <td className="student-name">
                    {`${student.First} ${student.Last}`}
                  </td>
                  <td className="student-grade">{student.Grade}</td>
                  <td className="student-teacher">{student.Teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* We will only display the right container containing all information if user selects the student within the list on the left container*/}
        {selectedStudent ? (
          <div className="right-container">
            <h1> Student Information </h1>

            <div className="student-profile-desc">
              {/* Display student card*/}
              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/assets/profile-picture.jpeg"
                  alt="profile-picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {selectedStudent.First} {selectedStudent.Last}
                  </Typography>
                  <figcaption variant="body2" color="text.secondary">
                    Student
                  </figcaption>
                </CardContent>
              </Card>
            </div>

            <div className="student-specifics">
              <div className="student-info-containers"></div>
              <div className="academic-info">
                <h2>Academic Information </h2>
                <p> Enrolled In: {selectedStudent.enrolledIn || "N/A"}</p>
                <p> Average Grade: {selectedStudent.Grade || "N/A"}</p>
                <p> Teacher Supervisor: {selectedStudent.Teacher || "N/A"} </p>
              </div>
              <div className="contact-info">
                <h2> Contact Information </h2>
                <p> Parent: {selectedStudent.parent || "N/A"}</p>
                <p>
                  Legal Guardian Phone #:
                  {selectedStudent.guardianPhone || "N/A"}
                </p>
                <p> Email: {selectedStudent.email || "N/A"}</p>
              </div>
              <div className="personal-info">
                <h2> Personal Information</h2>
                <p> Pronouns: {selectedStudent.Pronouns || "N/A"}</p>
                <p> Birthday: {selectedStudent.Birthday || "N/A"}</p>
                <p> Residence: {selectedStudent.Residence || "N/A"}</p>
              </div>
              <div className="update-student">
                <h2> Edit/Update Student</h2>
                {/* TODO: Must provide an option where we can remove/edit/update the student through a button */}
                <div className="update-buttons">
                  <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="secondary"
                  >
                    Remove Student
                  </Button>
                  <br />
                  <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Edit Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Select a student to see more details</p>
        )}
      </div>
    </div>
  );
};

export default Students;
