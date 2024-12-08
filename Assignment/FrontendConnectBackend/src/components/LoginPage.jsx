import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const api = "http://localhost:8080"; // The API endpoint
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [users, setUsers] = useState([]); // State for storing users

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/user/getAll`);
      console.log("<<<<< Get all users response >>>>>", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle login form submission
  const handlePost = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!(email && password)) {
      alert("All fields are required!");
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post(`${api}/user/login`, {
        email,
        password,
      });

      // Check if the login was successful
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        fetchUsers();
        alert("User logged in successfully");

        const userId = response.data._id; // This depends on how your backend returns user data
        navigate(`/detailPage/${userId}`); // Redirect to user detail page (adjust route if needed)
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error("Error in user login:", error);
    }
  };

  const handleDetail = (id) => {
    navigate(`/homePage/${id}`);
  };

  // UseEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <form onSubmit={handlePost}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="false"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="false"
          />
        </div>

        <button type="submit" className="btn_register">
          Login
        </button>
      </form>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>User ID: {user._id}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
            <button onClick={() => handleDetail(user._id)}>Detail</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Login;
