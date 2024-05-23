import {React, useState, useEffect} from 'react';
import {Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Grid} from '@mui/material';
import { db } from "../../firebase";
import Navbar from './components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {collection, doc, getDocs, updateDoc, setDoc, deleteDoc} from "firebase/firestore";
import ClearIcon from '@mui/icons-material/Clear';

const Calendar = () => {

    const[ModeladdOpen,setModeladdOpen] = useState(false)
    const[ModelDelOpen,setModelDelOpen] = useState(false)
    const[ModelEditOpen,setModelEditOpen] = useState(false)
    const [events, setEvents] = useState([]);
    const [inputTitle, setInputTitle] = useState();
    const [inputDate, setInputDate] = useState();

    const handleaddOpen=()=>{
      setModeladdOpen(true);
    }
    const handleaddClose=()=>{
      setModeladdOpen(false);
    }
    const handleDelOpen=()=>{
      setModelDelOpen(true);
    }
    const handleDelClose=()=>{
      setModelDelOpen(false);
    }
    const handleEditOpen=()=>{
      setModelEditOpen(true);
    }
    const handleEditclose=()=>{
      setModelEditOpen(false);
    }

    const showEvents = async () => {
        const documents = await getDocs(collection(db, "Events"));
        console.log(documents)
        let list = [];
        documents.forEach((events) => list.push({...events.data()}));
        setEvents(list);
        console.log(list);
    }

    useEffect(() => {
        showEvents();
    }, []);

    const addEvent = async() =>{
      setDoc(doc(db, "Events", inputTitle), {
        Date: inputDate,
        Name: inputTitle
      });
      setEvents([...events, {Name: inputTitle, Date: inputDate}])
      handleaddClose();
    }

    const deleteEvent = async(title, date) =>{
       await deleteDoc(doc(db, "events", title));
       let list = []
       for (let i = 0; i < events.length; i++) {
         if (events[i]["title"] != title){
           list.push(events[i])
         }
       }

       setEvents(list)
    }

    return (
      <>
      <Navbar/>
      <h1>School Calendar</h1>
      <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Grid item xs={1.5}>
              <Button variant="contained" onClick={handleaddOpen}>Add Event</Button>
          </Grid>
          {/*<Grid item xs={1.5}>
              <Button color="secondary" variant="contained" onClick={handleEditOpen}>Edit Event</Button>
          </Grid>*/}
          <Grid item xs={1.5}>
              <Button color="error" variant="contained" onClick={handleDelOpen}>Delete Event</Button>
          </Grid>
      </Grid>
      <Dialog open={ModeladdOpen}>
          <Grid item marginTop={2} marginLeft={28}>
            <ClearIcon onClick={handleaddClose}></ClearIcon>
          </Grid>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
              <Typography variant="h6">Title</Typography>
              <TextField onChange={(e) => {setInputTitle(e.target.value)}} placeholder='Title'>Title</TextField>
              <Typography variant="h6">Date</Typography>
              <TextField onChange={(e) => {setInputDate(e.target.value)}} placeholder='YYYY-MM-DD'>Date</TextField>
              <Grid item marginTop={2}>
                <div className='addButton'><Button variant="contained" justifycontent= "center" onClick={addEvent}>Add Event</Button></div>
              </Grid>
          </DialogContent>
      </Dialog>
      <Dialog open={ModelDelOpen}>
          <Grid item marginTop={3} marginLeft={38}>
            <ClearIcon onClick={handleDelClose}></ClearIcon>
          </Grid>
          <DialogTitle>List of Events</DialogTitle>
          <DialogContent>
          {Object.entries(events).map(([key, value]) => (
            <div key={key}>
              <p><b>Name:</b> {value.Name} | <b>Date:</b> {value.Date} <Button onClick={() => deleteEvent(value.title, value.date)}>Delete</Button></p>
            </div>
          ))}
          </DialogContent>
      </Dialog>
      <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={events} />
      </>
  );
};

export default Calendar;
