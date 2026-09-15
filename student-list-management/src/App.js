import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editStudentName, setEditStudentName] = useState("");
  const [editRollNumber, setEditRollNumber] = useState("");
  const [editStudentClass, setEditStudentClass] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      studentName.trim() === "" ||
      rollNumber.trim() === "" ||
      studentClass.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }

    const rollNumberExists = students.some(function (student) {
      return (
        student.rollNumber.toLowerCase() ===
        rollNumber.trim().toLowerCase()
      );
    });

    if (rollNumberExists) {
      alert("Roll number must be unique.");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      studentName: studentName.trim(),
      rollNumber: rollNumber.trim(),
      studentClass: studentClass.trim()
    };

    setStudents([...students, newStudent]);

    setStudentName("");
    setRollNumber("");
    setStudentClass("");
  }

  function startEdit(student) {
    setEditingId(student.id);
    setEditStudentName(student.studentName);
    setEditRollNumber(student.rollNumber);
    setEditStudentClass(student.studentClass);
  }

  function saveEdit(id) {
    if (
      editStudentName.trim() === "" ||
      editRollNumber.trim() === "" ||
      editStudentClass.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }

    const rollNumberExists = students.some(function (student) {
      return (
        student.id !== id &&
        student.rollNumber.toLowerCase() ===
          editRollNumber.trim().toLowerCase()
      );
    });

    if (rollNumberExists) {
      alert("Roll number must be unique.");
      return;
    }

    const updatedStudents = students.map(function (student) {
      if (student.id === id) {
        return {
          ...student,
          studentName: editStudentName.trim(),
          rollNumber: editRollNumber.trim(),
          studentClass: editStudentClass.trim()
        };
      }

      return student;
    });

    setStudents(updatedStudents);

    setEditingId(null);
    setEditStudentName("");
    setEditRollNumber("");
    setEditStudentClass("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditStudentName("");
    setEditRollNumber("");
    setEditStudentClass("");
  }

  function deleteStudent(id) {
    const updatedStudents = students.filter(function (student) {
      return student.id !== id;
    });

    setStudents(updatedStudents);
  }

  const filteredStudents = students.filter(function (student) {
    return student.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h1 className="text-center mb-4">
        Student List Management App
      </h1>

      {/* Add Student Form */}
      <div className="card p-4 mb-4">
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Student Name
            </label>

            <input
              type="text"
              className="form-control"
              value={studentName}
              onChange={function (event) {
                setStudentName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Roll Number
            </label>

            <input
              type="text"
              className="form-control"
              value={rollNumber}
              onChange={function (event) {
                setRollNumber(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Class
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Example: 10A"
              value={studentClass}
              onChange={function (event) {
                setStudentClass(event.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Student
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="card p-4 mb-4">
        <label className="form-label">
          Search Students
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={function (event) {
            setSearchTerm(event.target.value);
          }}
        />
      </div>

      {/* Student List */}
      <div className="card p-4">
        <h2>Student List</h2>

        {filteredStudents.length === 0 ? (
          <p>No students found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map(function (student) {
                  return (
                    <tr key={student.id}>
                      <td>{student.id}</td>

                      {editingId === student.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editStudentName}
                              onChange={function (event) {
                                setEditStudentName(
                                  event.target.value
                                );
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editRollNumber}
                              onChange={function (event) {
                                setEditRollNumber(
                                  event.target.value
                                );
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editStudentClass}
                              onChange={function (event) {
                                setEditStudentClass(
                                  event.target.value
                                );
                              }}
                            />
                          </td>

                          <td>
                            <button
                              className="btn btn-success me-2"
                              onClick={function () {
                                saveEdit(student.id);
                              }}
                            >
                              Save
                            </button>

                            <button
                              className="btn btn-secondary"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{student.studentName}</td>
                          <td>{student.rollNumber}</td>
                          <td>{student.studentClass}</td>

                          <td>
                            <button
                              className="btn btn-warning me-2"
                              onClick={function () {
                                startEdit(student);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={function () {
                                deleteStudent(student.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
