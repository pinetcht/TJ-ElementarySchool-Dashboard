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
import { addDoc, getDocs, getDoc, doc, collection } from "firebase/firestore";

const Classes = () => {
  const [students, setStudents] = useState(null);
  const [thisClass, setClass] = useState(null);
  const [grade, setGrade] = useState();
  const [editGrade, setEditGrade] = useState(false);

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
          console.log("No student document!");
        }
      } catch (error) {
        console.error("Cannot load students", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, "Classes", "1lJfsnl3Ah0QjgwBNZpA")
        );
        if (querySnapshot != null) {
          const fetchedClass = querySnapshot.data();

          setClass(fetchedClass);
        } else {
          console.log("No class document!");
        }
      } catch (error) {
        console.error("Cannot load classes", error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "Students"),{
      Grade: grade,
    });
  };

  
  return (
    <>
      {thisClass && (
        <>
          <h1>{thisClass.Name} Class</h1>
          <div>
            <h2>General Info</h2>
            <p>Welcome students!</p>
            <p>
              <b>Start Time:</b> {thisClass.Start_time}
            </p>
            <p>
              <b>End Time:</b> {thisClass.End_time}
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
                        {editGrade ? (
                          <form onSubmit={ handleSubmit }>
                            <input type="text" onChange={ (e) => setGrade(e.target.value) }></input>
                            <button type="submit"> Submit</button>
                          </form>
                        ) : (
                          row.Grade
                        )}

                        <IconButton
                          variant="filled"
                          onClick={() => {
                            setEditGrade(!editGrade);
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
  );
};

export default Classes;
