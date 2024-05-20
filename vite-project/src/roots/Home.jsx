import React from 'react';

import "../styles/Home.css";
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ClassIcon from '@mui/icons-material/Class';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Class from '@mui/icons-material/Class';

const Home = () => {

    const navigate = useNavigate();

  const handleClasses = () => {
    navigate('/classes');
  };

  const handleCalendar = () => {
    navigate('/calendar');
  };

  const handleStudent = () => {
    navigate('/students');
  };

  const handleTeacher = () => {
    navigate('/teachers');
  };

  return (
    <div>
      <div className="image-container">
        <img src="/public/homePageSchool.jpeg" alt="School Image" className="full-width-image"></img>
        <div className="overlay"></div>
        <h1 className="homeScreenHeader">Welcome</h1>
    </div>
    <hr className = "homePageHr"></hr>
    <Grid container spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12} md={6}>
        <Card id = "homePageCard">
          <CardContent id ="homePageCardContent">
            <Typography variant="h5" component="div" id = "homePageCardHeader">
              Explore Classes <ClassIcon></ClassIcon>
            </Typography>
            <Typography variant="body2" color="text.secondary" id = "homePageCardDesc">
              View all classes offered at Thomas Jefferson Elementary School.
            </Typography>
            <Button variant = "contained" color = "primary" id = "homePageCardBtn" onClick = {handleClasses}>View Classes</Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card id = "homePageCard">
          <CardContent id ="homePageCardContent">
            <Typography variant="h5" component="div" id = "homePageCardHeader">
              View Events Calendar <CalendarMonthIcon></CalendarMonthIcon>
            </Typography>
            <Typography variant="body2" color="text.secondary" id = "homePageCardDesc">
              See a calendar showcasing upcoming events taking place at Thomas Jefferson Elementary School!
            </Typography>
            <Button variant = "contained" color = "primary" id = "homePageCardBtn" onClick = {handleCalendar}>View Calendar</Button>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card id = "homePageCard">
          <CardContent id ="homePageCardContent">
            <Typography variant="h5" component="div" id = "homePageCardHeader">
              View Student Directory <SchoolIcon></SchoolIcon>
            </Typography>
            <Typography variant="body2" color="text.secondary" id = "homePageCardDesc">
              View information associated with students at Thomas Jefferson Elementary School
            </Typography>
            <Button variant = "contained" color = "primary" id = "homePageCardBtn" onClick = {handleStudent}>Student Directory</Button>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card id = "homePageCard">
          <CardContent id ="homePageCardContent">
            <Typography variant="h5" component="div" id = "homePageCardHeader">
              View Teacher Directory <SupervisorAccountIcon></SupervisorAccountIcon>
            </Typography>
            <Typography variant="body2" color="text.secondary" id = "homePageCardDesc">
              View information associated with teachers at Thomas Jeferson Elementary School
            </Typography>
            <Button variant = "contained" color = "primary" id = "homePageCardBtn" onClick = {handleTeacher}>Teacher Directory</Button>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default Home;
