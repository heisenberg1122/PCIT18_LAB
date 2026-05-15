import './App.css';
import { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Notification from './components/Notification';
import { API_BASE_URL } from './api';


function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const fetchStudents = async () => {
    const res= await fetch(API_BASE_URL);
    const data = await res.json();
    setStudents(data.data || []);
    setEditingStudent((current) => {
      if (!current) {
        return null;
      }

      const updatedStudent = data.data.find((student) => student._id === current._id);
      return updatedStudent || null;
    });
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification({ message: "", type: "" });
  };  

  useEffect(() => {
    fetchStudents();

    const handleFocus = () => {
      fetchStudents();
    };

    window.addEventListener('focus', handleFocus);

    const refreshTimer = setInterval(() => {
      fetchStudents();
    }, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="background-glow background-glow-left" aria-hidden="true" />
      <div className="background-glow background-glow-right" aria-hidden="true" />

      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

      <main className="app-container">
        <header className="app-header">
          <p className="app-kicker">Registrar Dashboard</p>
          <h1>Student Management System</h1>
          <p className="app-subtitle">
            Add, update, and organize student records in one place.
          </p>
        </header>

        <section className="content-grid">
          <StudentForm
            fetchStudents={fetchStudents}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            showNotification={showNotification}
          />
          <StudentList
            students={students}
            fetchStudents={fetchStudents}
            setEditingStudent={setEditingStudent}
            showNotification={showNotification}
          />
        </section>
      </main>
    </div>
  );
}

export default App;