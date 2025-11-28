
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

// Dummy data for students and their schedules
const dummyData = {
  "202112345": {
    password: "password123",
    name: "احمد المحمد",
    lectures: [
      { id: 1, course: "الرياضيات المتقطعة", time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), room: "قاعة 101" },
      { id: 2, course: "هياكل البيانات", time: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), room: "قاعة 203" },
      { id: 3, course: "قواعد البيانات", time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), room: "قاعة 305" }
    ]
  },
  "202254321": {
    password: "password456",
    name: "فاطمة الزهراء",
    lectures: [
      { id: 1, course: "الخوارزميات", time: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), room: "قاعة 102" },
      { id: 2, course: "شبكات الحاسوب", time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), room: "قاعة 204" }
    ]
  }
};

function App() {
  const [loggedInStudent, setLoggedInStudent] = useState(null);

  const handleLogin = (universityId, password) => {
    const student = dummyData[universityId];
    if (student && student.password === password) {
      setLoggedInStudent(student);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
  };

  return (
    <div className="App">
      {!loggedInStudent ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard student={loggedInStudent} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
