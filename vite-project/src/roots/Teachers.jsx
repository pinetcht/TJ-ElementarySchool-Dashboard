import React, { useState } from 'react';


const teachersData = [
  { name: 'Ms. Johnson', department: 'Science', phone: 'XXX-XXX-XXXX' },
  { name: 'Mr. Larry', department: 'Launch', phone: 'XXX-XXX-XXXX' },
  { name: 'Mr. Ritter', department: 'SWE', phone: 'XXX-XXX-XXXX' },
  { name: 'Mr. Wembanyama', department: 'History', phone: 'XXX-XXX-XXXX' },
  { name: 'Ms. Sandy', department: '', phone: 'XXX-XXX-XXXX' },
  { name: 'Ms. Mary', department: 'Math', phone: 'XXX-XXX-XXXX' },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState(teachersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleSearch = () => {
    const filteredTeachers = teachersData.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            {teachers.map((teacher, index) => (
              <div className="teacher-item" key={index} onClick={() => handleTeacherClick(teacher)}>
                <div className="teacher-avatar"></div>
                <div className="teacher-info">
                  <p className="teacher-name">{teacher.name}</p>
                  <p className="teacher-department">{teacher.department}</p>
                  <p className="teacher-phone">{teacher.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="right-panel">
          {selectedTeacher ? (
            <div className="teacher-detail">
              <div className="teacher-avatar-large"></div>
              <h3>{selectedTeacher.name}</h3>
              <div className="teacher-contact">
                <h4>Contact Information</h4>
                <p>Office Tel: {selectedTeacher.phone}</p>
                <p>Mobile: XXX-XXX-XXXX</p>
                <p>Email: example@example.com</p>
              </div>
              <div className="teacher-work">
                <h4>Work Information</h4>
                <p>Department: {selectedTeacher.department}</p>
                <p>Supervisor: Mr. Smith</p>
              </div>
              <div className="teacher-personal">
                <h4>Personal Information</h4>
                <p>Pronouns: She/Her</p>
                <p>Birthday: January 1</p>
                <p>City: City Name</p>
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
