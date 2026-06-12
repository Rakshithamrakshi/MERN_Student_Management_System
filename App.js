import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    usn: "",
    branch: "",
  });

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(
        `http://localhost:5000/students/update/${editingId}`,
        student
      );

      setEditingId(null);
    } else {
      await axios.post(
        "http://localhost:5000/students/add",
        student
      );
    }

    setStudent({
      name: "",
      usn: "",
      branch: "",
    });

    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/students/delete/${id}`
    );

    fetchStudents();
  };

  const handleEdit = (s) => {
    setStudent({
      name: s.name,
      usn: s.usn,
      branch: s.branch,
    });

    setEditingId(s._id);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.usn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🎓 Student Management System</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="usn"
          placeholder="USN"
          value={student.usn}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={student.branch}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <input
        className="search"
        type="text"
        placeholder="Search by Name or USN..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>USN</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.usn}</td>
              <td>{s.branch}</td>

              <td>
                <button
                  className="editBtn"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;