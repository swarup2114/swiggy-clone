import React, { useState, useContext } from 'react';
import { popupContext } from '../../App';
import './Signup.css';

const Signup = () => {
  const { setIsPopUpOpen, setPopupType } = useContext(popupContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 6) {
      newErrors.username = "Username greater than 6 letters";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const newUser = { ...formData, cart: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setPopupType("Login")
    // setIsPopUpOpen(false);

  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className='toggle-btn'>
          <h1 onClick={() => setIsPopUpOpen(false)}>X</h1>
        </div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            {errors.username && <p className="error">{errors.username}</p>}
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
            {errors.email && <p className="error">{errors.email}</p>}
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
            {errors.password && <p className="error">{errors.password}</p>}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Signup</button>
          <p onClick={() => setPopupType("Login")} className='auth-tab'>Login to your account?</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
