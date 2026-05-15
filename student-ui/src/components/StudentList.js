import React from "react";
import { API_BASE_URL } from "../api";

function StudentList({ students, fetchStudents, setEditingStudent, showNotification }) {
    const handleDelete = async (id) => {
        // Confirmation dialog to cancel the deletion
        const student = students.find(s => s._id === id);
        const isConfirmed = window.confirm(`Are you sure you want to delete ${student?.firstname} ${student?.lastname}? Click Cancel to abort.`);
        
        if (!isConfirmed) {
            return; // Stops the function execution if Cancel is clicked
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete student");
            }
            showNotification(`Student "${student?.firstname} ${student?.lastname}" has been deleted successfully!`, "success");
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
            showNotification(`Error: ${error.message}`, "error");
        }
    };

    return (
        <section className="panel panel-list" aria-labelledby="student-list-title">
            <div className="panel-heading">
                <h2 id="student-list-title">Student Records</h2>
                <p>{students.length} student{students.length === 1 ? "" : "s"} in the system</p>
            </div>

            <div className="table-wrap">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Course</th>
                            <th>Year</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            const isEnrolled = student.enrolled === true || student.enrolled === "true" || student.enrolled === 1;

                            return (
                                <tr key={student._id}>
                                    <td>{student.firstname}</td>
                                    <td>{student.lastname}</td>
                                    <td>{student.course}</td>
                                    <td>{student.year_level ?? student.year ?? "-"}</td>
                                    <td>
                                        <span className={`status-pill ${isEnrolled ? "is-active" : "is-inactive"}`}>
                                            {isEnrolled ? "Currently enrolled" : "Not enrolled"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => setEditingStudent(student)} className="btn btn-edit">Edit</button>
                                            <button onClick={() => handleDelete(student._id)} className="btn btn-delete">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default StudentList;