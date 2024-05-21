import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'teachers'));
      const teachersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(teachersList);
    } catch (error) {
      console.error("Error fetching teacher data: ", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = () => {
    const filteredTeachers = teachers.filter(teacher =>
      teacher.First.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.Last.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTeachers(filteredTeachers);
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  return (
    <div className="teacher-directory">
      <header className="header">
        <h1>TJ Elementary Dashboard</h1>
        <h2>Faculty & Staff Directory</h2>
      </header>
      <div className="content">
        <div className="left-panel">
          <h3>All Teachers</h3>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <div className="teacher-list">
            {teachers.map((teacher) => (
              <div className="teacher-item" key={teacher.id} onClick={() => handleTeacherClick(teacher)}>
                <div className="teacher-avatar"></div>
                <div className="teacher-info">
                  <p className="teacher-name">{teacher.First} {teacher.Last}</p>
                  <p className="teacher-department">{teacher.Subject}</p>
                  <p className="teacher-phone">Age: {teacher.Age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-panel">
          {selectedTeacher ? (
            <div className="teacher-detail">
              <div className="teacher-avatar-large"></div>
              <h3>{selectedTeacher.First} {selectedTeacher.Last}</h3>
              <div className="teacher-contact">
                <h4>Contact Information</h4>
                <p>Office Tel: {selectedTeacher.OfficeTel || 'N/A'}</p>
                <p>Mobile: {selectedTeacher.Mobile || 'N/A'}</p>
                <p>Email: {selectedTeacher.Email || 'N/A'}</p>
              </div>
              <div className="teacher-work">
                <h4>Work Information</h4>
                <p>Department: {selectedTeacher.Subject}</p>
                <p>Supervisor: {selectedTeacher.Supervisor || 'N/A'}</p>
              </div>
              <div className="teacher-personal">
                <h4>Personal Information</h4>
                <p>Pronouns: {selectedTeacher.Pronouns || 'N/A'}</p>
                <p>Birthday: {selectedTeacher.Birthday || 'N/A'}</p>
                <p>City: {selectedTeacher.City || 'N/A'}</p>
              </div>
            </div>
          ) : (
            <p>Select a teacher to see more details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
