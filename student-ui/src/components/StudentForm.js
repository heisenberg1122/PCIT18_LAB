import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

function StudentForm({ fetchStudents, editingStudent, setEditingStudent, showNotification }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");
    const [gender, setGender] = useState("Male");
    const [enrolled, setEnrolled] = useState(false);
    const [previousEditingId, setPreviousEditingId] = useState(null);

    useEffect(() => {
        const currentEditingId = editingStudent?._id;
        
        // Only update form if the editing ID has actually changed
        if (currentEditingId !== previousEditingId) {
            if (editingStudent) {
                setFirstname(editingStudent.firstname ?? "");
                setLastname(editingStudent.lastname ?? "");
                setCourse(editingStudent.course ?? "");
                setYear(editingStudent.year_level ?? editingStudent.year ?? "");
                setSection(editingStudent.section ?? "");
                setGender(editingStudent.gender ?? "Male");
                setEnrolled(Boolean(editingStudent.enrolled));
            } else {
                setFirstname("");
                setLastname("");
                setCourse("");
                setYear("");
                setSection("");
                setGender("Male");
                setEnrolled(false);
            }
            setPreviousEditingId(currentEditingId);
        }
    }, [editingStudent?._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure all required fields are present
        if (!firstname || !lastname || !course || !year || !section || !gender) {
            alert("All fields are required");
            return;
        }

        const student = {
            firstname,
            lastname,
            course,
            year_level: Number(year),
            section,
            gender,
            enrolled,
        };
        console.log("Submitting student:", student);

        try {
            if (editingStudent) {
                const response = await fetch(`${API_BASE_URL}/${editingStudent._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(student),
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error("Backend error:", errorData);
                    throw new Error(`Failed to update student: ${response.status}`);
                }
                showNotification(`Student "${firstname} ${lastname}" has been updated successfully!`, "success");
                setEditingStudent(null);
            } else {
                const response = await fetch(API_BASE_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(student),
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    console.error("Backend error:", errorData);
                    throw new Error(`Failed to add student: ${response.status}`);
                }
                showNotification(`Student "${firstname} ${lastname}" has been added successfully!`, "success");
            }
            // Clear fields after submitting
            setFirstname("");
            setLastname("");
            setCourse("");
            setYear("");
            setSection("");
            setGender("Male");
            setEnrolled(false);
            fetchStudents();
        } catch (error) {
            console.error("Error saving student:", error);
            showNotification(`Error: ${error.message}`, "error");
        }
    };

    const handleCancel = () => {
        // Resets the editing state and clears the form to cancel the update
        setEditingStudent(null);
        setFirstname("");
        setLastname("");
        setCourse("");
        setYear("");
        setSection("");
        setGender("Male");
        setEnrolled(false);
    };

    return (
        <section className="panel panel-form" aria-labelledby="student-form-title">
            <div className="panel-heading">
                <h2 id="student-form-title">{editingStudent ? "Edit Student" : "Add Student"}</h2>
                <p>{editingStudent ? "Update student details and save changes." : "Create a new student record."}</p>
            </div>

            <form onSubmit={handleSubmit} className="student-form">
                <div className="form-grid">
                    <label className="form-field">
                        <span>First Name</span>
                        <input
                            type="text"
                            placeholder="e.g. Maria"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Last Name</span>
                        <input
                            type="text"
                            placeholder="e.g. Santos"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Course</span>
                        <input
                            type="text"
                            placeholder="e.g. BSIT"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Year</span>
                        <input
                            type="number"
                            placeholder="e.g. 3"
                            min="1"
                            max="5"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Section</span>
                        <input
                            type="text"
                            placeholder="e.g. A"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        <span>Gender</span>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                borderRadius: "12px",
                                border: "1px solid rgba(1, 27, 81, 0.24)",
                                background: "#fffefb",
                                color: "var(--text-main)",
                                fontSize: "0.96rem",
                                padding: "0.64rem 0.72rem",
                            }}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>

                <label className="checkbox-field">
                    <input
                        type="checkbox"
                        checked={enrolled}
                        onChange={(e) => setEnrolled(e.target.checked)}
                    />
                    <span>Currently enrolled</span>
                </label>

                <div className="button-row">
                    <button type="submit" className="btn btn-primary">
                        {editingStudent ? "Save Changes" : "Add Student"}
                    </button>

                    {editingStudent && (
                        <button type="button" onClick={handleCancel} className="btn btn-secondary">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}

export default StudentForm;