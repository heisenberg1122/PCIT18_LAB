import './App.css';
import { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';


function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const res= await fetch("http://localhost:3000/api/students");
    const data = await res.json();
    setStudents(data.data);
    setEditingStudent((current) => {
      if (!current) {
        return null;
      }

      const updatedStudent = data.data.find((student) => student._id === current._id);
      return updatedStudent || null;
    });
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
    <div style={{padding: '20px'}}>
      <h1>Student Management System</h1>
      <StudentForm
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}

export default App;