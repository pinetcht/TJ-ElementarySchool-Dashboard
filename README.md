# Thomas Jefferson Elementary School Dashboard

  A school management website for fictional Thomas Jefferson Elementary School. Goal is to centralize administrative tasks and eliminate paper records for student roster, teachers, classroom enrollment, and events. Built with React and Google Firebase.


<div align="center">
  <img src="https://github.com/user-attachments/assets/b13175ae-7281-4a5d-a6e5-072e04cad08a" alt="School Dashboard" width="700"/>
</div>


## Table of Contents
1. [Features](#features)
2. [Installation](#installation)


## Features
* **Home Page** - Dashboard to access student and teacher roster, classes, and events
* **Student Roster** - View student information and 
* **Teacher Roster** - View teacher information
* **Class page** - edit grades and enroll students into class
* **Calendar** - add and delete school-wide events

## Installation 
1. Clone the repo
```bash
git clone {repo url}
```
2. Run the frontend code
```bash
cd vite-project
npm install
npm run dev
```

3. Firebase Setup:
* Create a Firebase project in the Firebase Console.
* Add your Firebase config to a .env file:
  ```
  VITE_FIREBASE_API_KEY=your-api-key
  VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
  VITE_FIREBASE_PROJECT_ID=your-project-id
  VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
  VITE_FIREBASE_APP_ID=your-app-id
  ```
* Make sure to enable the necessary Firebase services (Firestore, Authentication, etc.).
4. Start the app:
```
npm run dev
```

### Credits
Authors: Jennifer, Ethan, Pravesh, Pine, Omar

This project was completed as a part of Forge Launch SWE Training. Special Thanks to TA's Simon Anderson, and Byron Richards, and Alum Instructor Mitch Gillin. 

