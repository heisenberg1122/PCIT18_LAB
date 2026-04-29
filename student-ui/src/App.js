import logo from './logo.svg';
import './App.css';
import react, { use, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';


function App() {
  const [students, setStudents] = react.useState([]);

  const fetchStudents = async () => {
    const res= await fetch("http://localhost:3000/api/students");
    const data = await res.json();
    setStudents(data.data);
  };  

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{padding: '20px'}}>
      <h1>Student Management System</h1>
      <StudentForm fetchStudents={fetchStudents} />
      <StudentList students={students} fetchStudents={fetchStudents} />
    </div>
  );
}

export default App;