import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import "../styles/Students.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Students = () => {
  const [students, setStudents] = useState([]);

  const handleShowAnswerFeedback = () => {
    // Define the functionality for handling the button click here
    console.log("Button clicked");
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
          <h1> All Teachers</h1>
          <p> Browse through the list of all teachers</p>

          {/* Add Search Bar */}
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              // Must add onChange event handler for search functionality
            />
          </div>
          {/* Add Submit Bar */}
          <Button onClick={handleShowAnswerFeedback} variant="contained">
            Submit
          </Button>
        </div>

        <div className="right-container">
          <h1> Student Information </h1>
          {/* Add Student Card that includes their grade and name */}

          <div className="student-specifics">
            <div className="student-info-containers"></div>
            <div className="contact-info">
              <h2> Contact Information </h2>
              <p> Parent: </p>
              <p> Legal Guardian: </p>
              <p> Email: </p>
            </div>
            <div className="personal-info">
              <h2> Personal Information</h2>
              <p> Pronouns: </p>
              <p> Birthday: </p>
              <p> Residence: </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
