import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { db } from "../../firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Students.css";

import {
  addDoc,
  getDocs,
  getDoc,
  doc,
  collection,
  updateDoc,
} from "firebase/firestore";

const Classes = () => {
  const [students, setStudents] = useState(null);
  const [thisClass, setClass] = useState(null);
  const [classes, setAllClasses] = useState(null);
  const [grade, setGrade] = useState();
  const [editGrade, setEditGrade] = useState(false);
  const [editGradeIndex, setEditGradeIndex] = useState(null);
  const [teacherName, setTeacherName] = useState(null);
  const [teacherNames, setTeacherNames] = useState({});
  const [classSelected, setClassSelected] = useState(false);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Students"));
      if (querySnapshot != null) {
        const allStudents = querySnapshot.docs.map((doc, key) => ({
          id: doc.id,
          key,
          ...doc.data(),
        }));

        setStudents(allStudents);
      } else {
        console.log("No student document!");
      }
    } catch (error) {
      console.error("Cannot load students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchAllTeacherNames = async () => {
    const names = {};
    for (const eachClass of classes) {
      if (eachClass.Teacher) {
        const name = await fetchTeacherName(eachClass.Teacher);
        names[eachClass.Teacher] = name;
      }
    }
    setTeacherNames(names);
  }

  useEffect(() => {
    fetchAllTeacherNames()
  }, [classes])

  const fetchTeacherName = async (teacherRef) => {
    try {
      const teacherDoc = await getDoc(doc(db, "teachers", teacherRef));
      console.log(teacherDoc);
      if (teacherDoc.exists()) {
        const teacherData = teacherDoc.data();
        return `${teacherData.First} ${teacherData.Last}`;
      } else {
        //console.error("Teacher document not found");
        return "N/A";
      }
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      return "N/A";
    }
  };


  const fetchSelectedClass = async () => {
    try {

      let querySnapshot = null
      
      if(thisClass) {
        querySnapshot = await getDoc(
          doc(db, "Classes", thisClass.id)
        );
      }
      
      if (querySnapshot != null) {
        const fetchedClass = querySnapshot.data();
        setClass(fetchedClass);


        if (fetchedClass.Teacher) {
          // console.log(fetchedClass.Teacher)
          const teacherName = await fetchTeacherName(fetchedClass.Teacher);
          setTeacherName(teacherName);
        }

      } else {
        console.log("No class document!");
      }
    } catch (error) {
      console.error("Cannot load classes", error);
    }
  };

  useEffect(() => {
    fetchSelectedClass();
  }, [thisClass]);

  const fetchAllClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Classes"));
      if (querySnapshot != null) {
        const allClasses = querySnapshot.docs.map((doc, key) => ({
          id: doc.id,
          key,
          ...doc.data(),
        }));

        setAllClasses(allClasses);
      } else {
        console.log("No classes document!");
      }
    } catch (error) {
      console.error("Cannot load all the classes", error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    await updateDoc(doc(db, "Students", index), {
      Grade: grade,
    });

    setEditGradeIndex(null);
    setEditGrade(false);
    fetchStudents();
  };

  const handleGradeChange = (e) => {
    const newGrade = e.target.value;
    setGrade(newGrade);
  };

  const handleClassClick = async (selectedClass) => {
    console.log(selectedClass)
    setClass(selectedClass);
    setClassSelected(true);
  };

  useEffect(() => {
    if(thisClass) {
      console.log(thisClass);
      console.log(thisClass.Start_time);
      console.log(thisClass.End_time);
    }

  }, [thisClass])
 

  return (
    <>
      {!classSelected ? (
        <>
          <h1>Class roster</h1>
          <p> Select a class to view additional info! </p>
          {(classes && teacherNames) && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Class Name</TableCell>
                    <TableCell align="left">Teacher</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes &&
                    classes.map((eachClass) => (
                      <TableRow
                        key={eachClass.id}
                        onClick={() => handleClassClick(eachClass)}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          hover
                          sx={{
                            "&.MuiTableCell-root:hover": {
                              color: "blue",
                            },
                          }}
                        >
                          {eachClass.Name}
                        </TableCell>
                        <TableCell align="left">
                          { teacherNames[eachClass.Teacher] || "Loading..."}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <>
          <IconButton
            variant="filled"
            onClick={() => {
              setClassSelected(false);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          {(thisClass) &&
             (
              <>
                <h1>{thisClass.Name} Class</h1>

                <div>
                  <h2>General Info</h2>
                  <p>Welcome students!</p>
                  <p>
                    <b>Start Time:</b> {thisClass.Start_time}
                    <br></br>
                    <b>End Time:</b> {thisClass.End_time}
                    <br></br>
                    <b>Teacher:</b> {teacherNames[thisClass.Teacher]  || "Loading..."}
                  </p>
                </div>
              </>
            )}
          <div>
            <h2>Roster</h2>

            {students && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student First Name</TableCell>
                      <TableCell align="left">Student Last Name</TableCell>
                      <TableCell align="left">Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students &&
                      students.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.First}
                          </TableCell>
                          <TableCell align="left">{row.Last}</TableCell>
                          <TableCell align="left">
                            {editGrade && editGradeIndex === row.id ? (
                              <>
                                <form onSubmit={(e) => handleSubmit(e, row.id)}>
                                  <TextField
                                    type="text"
                                    defaultValue={grade}
                                    onChange={(e) => handleGradeChange(e)}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                      style: { width: `80px` },
                                    }}
                                  ></TextField>
                                  <Button type="submit"> Submit</Button>
                                </form>
                              </>
                            ) : (
                              row.Grade
                            )}

                            <IconButton
                              variant="filled"
                              onClick={() => {
                                setEditGrade(!editGrade);
                                setEditGradeIndex(row.id);
                                setGrade(row.Grade);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Classes;
