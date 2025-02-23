import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ setUser }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Processing" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/dashboard/" + data.user.role.toLowerCase());
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="Processing">Processing</option>
          <option value="Polishing">Polishing</option>
          <option value="Certification">Certification</option>
          <option value="Retailer">Retailer</option>
          <option value="Consumer">Consumer</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;