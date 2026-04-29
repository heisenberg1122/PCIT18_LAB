import React, { useState } from "react";

function StudentForm({ fetchStudents }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [course, setCourse] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [section, setSection] = useState("");
    const [gender, setGender] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (!firstname || !lastname || !course || !yearLevel || !section || !gender) {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:3000/api/students", {
                method: "POST",
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
            });

            if (!response.ok) {
                throw new Error("Failed to add student");
            }

            const result = await response.json();

            if (result.success) {
                alert("Student added successfully!");
                setFirstname("");
                setLastname("");
                setCourse("");
                setYearLevel("");
                setSection("");
                setGender("");
                fetchStudents();
            } else {
                alert(result.message || "Failed to add student");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <h2>Add Student</h2>
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
            <button type="submit">Add Student</button>
        </form>
    );
}

export default StudentForm;