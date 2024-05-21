import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { db } from "../../firebase";
import { addDoc, getDocs, doc, collection } from "firebase/firestore";

const Classes = () => {
  const [students, setStudents] = useState(null);



  useEffect(() => {
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
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Cannot load answer", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    console.log(students)
    console.log(students[1].enrolledIn)
  },[students])


  let TableHeader = null;
  if (students) {
    TableHeader = (
      <>
        <TableCell>Student First Name</TableCell>
        <TableCell align="right">Student Last Name</TableCell>
        <TableCell align="right">Grade</TableCell>
      </>
    );
  }

  return (
    <>
      <h1>Science Class</h1>
      <div>
        <h2>General Info</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at
          leo lacus. Duis ac feugiat nunc. Morbi eleifend nulla quis est
          lobortis posuere. Fusce molestie et est eu vestibulum. Aenean ipsum
          lorem, sollicitudin ut feugiat a, congue a nisi. Suspendisse lobortis
          rhoncus velit at hendrerit. Quisque aliquet eu arcu et ullamcorper.
        </p>
      </div>

      <div>
        <h2>Roster</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                { TableHeader }
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row) => (
                <TableRow
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.First}
                  </TableCell>
                  <TableCell align="right">{row.Last}</TableCell>
                  <TableCell align="right">{row.Grade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Classes;
