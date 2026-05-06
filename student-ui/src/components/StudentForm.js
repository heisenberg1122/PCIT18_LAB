import React, { useEffect, useState } from "react";

function StudentForm({ fetchStudents, editingStudent, setEditingStudent }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [section, setSection] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (editingStudent) {
            setFirstname(editingStudent.firstname || "");
            setLastname(editingStudent.lastname || "");
            setCourse(editingStudent.course || "");
            setYearLevel(editingStudent.year_level ? String(editingStudent.year_level) : "");
            setSection(editingStudent.section || "");
            setGender(editingStudent.gender || "");
            return;
        }

        setFirstname("");
        setLastname("");
        setCourse("");
        setYearLevel("");
        setSection("");
        setGender("");
    }, [editingStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (!firstname || !lastname || !course || !yearLevel || !section || !gender) {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            const isEditing = Boolean(editingStudent?._id);
            const response = await fetch(
                isEditing
                    ? `http://localhost:3000/api/students/${editingStudent._id}`
                    : "http://localhost:3000/api/students",
                {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    course,
                    year_level: parseInt(yearLevel),
                    section,
                    gender
                }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.message || `HTTP ${response.status}`;
                throw new Error(isEditing ? `Failed to update: ${errorMsg}` : `Failed to add: ${errorMsg}`);
            }

            const result = await response.json();

            if (result.success) {
                alert(isEditing ? "Student updated successfully!" : "Student added successfully!");
                setFirstname("");
                setLastname("");
                setCourse("");
                setYearLevel("");
                setSection("");
                setGender("");
                setEditingStudent(null);
                fetchStudents();
            } else {
                alert(result.message || (isEditing ? "Failed to update student" : "Failed to add student"));
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const cancelEdit = () => {
        setEditingStudent(null);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
            <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
            />  
            <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
            />
            <input
                type="number"
                placeholder="Year Level"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
            />
            <input
                type="text"
                placeholder="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
            />
            <input
                type="text" 
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            />
            <button type="submit">{editingStudent ? "Update Student" : "Add Student"}</button>
            {editingStudent && (
                <button type="button" onClick={cancelEdit} style={{ marginLeft: "8px" }}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default StudentForm;