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

  const [students, setStudents] = useState(null)

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Students"));
        if (querySnapshot != null) {
          const student = []
          const allStudents = querySnapshot.docs.map(doc => student.push({ id: doc.id, ...doc.data() }));
          
          setStudents(allStudents)

          console.log(allStudents)
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Cannot load answer", error);
      }
    };

    fetchDoc();
  }, []);

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
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
