import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    dateofbirth: "",
    address: "",
  });

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState([]);
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      name: "",
      email: "",
      phonenumber: "",
      dateofbirth: "",
      address: "",
    });
  };

  // Handle row deletion
  const handleDelete = (index) => {
    const newData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(newData);
  };
  return (
    <>
      <div className="signup_container">
        <div className="container">
          <h3>Registration From</h3>

          <form action="" className="signup_form" onSubmit={handleSubmit}>
            <div className="signup_username">
              <input
                inputMode="text"
                name="name"
                id="signup_username"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup_email">
              <input
                inputMode="email"
                type="email"
                name="email"
                id="signup_email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup_phonenumber">
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup_dob">
              <input
                type="date"
                name="dateofbirth"
                id="dateOfBirth"
                value={formData.dateofbirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="signup_address">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn_signup" onClick={handleSubmit}>
              Register
            </button>

            <div className="table_container">
              <h3>Submitted Data</h3>
              <table id="data_table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.phonenumber}</td>
                      <td>{data.dateofbirth}</td>
                      <td>{data.address}</td>
                      <td>
                        <button
                          className="btn_delete"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
