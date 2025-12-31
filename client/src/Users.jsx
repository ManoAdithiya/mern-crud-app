import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Standardize the API Base URL
const API_URL = "https://mern-crud-backend-q1xl.onrender.com/api/users";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Calling the route we just fixed in the backend
    axios
      .get(API_URL)
      .then((result) => setUsers(result.data))
      .catch((err) => console.error("Frontend Error:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://mern-crud-backend-q1xl.onrender.com/deleteUser/${id}`)
      .then(() => {
        // Update state locally so the user disappears immediately
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success mb-2">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-sm btn-success me-2"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
