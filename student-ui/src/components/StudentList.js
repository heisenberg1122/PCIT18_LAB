import React from "react";

function StudentList({ students, fetchStudents, setEditingStudent }) {
    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/students/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }

            const result = await response.json();
            
            if (result.success) {
                alert("Student deleted successfully");
                fetchStudents();
            } else {
                alert(result.message || "Failed to delete student");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    }

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {Array.isArray(students) && students.map((student) => (
                    <li key={student._id}>
                        {student.firstname} {student.lastname} - {student.course} - Year {student.year_level} - Section {student.section} -
                        <button onClick={() => setEditingStudent(student)} style={{ marginLeft: "8px" }}>Edit</button>
                        <button onClick={() => deleteStudent(student._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
        
}


export default StudentList;