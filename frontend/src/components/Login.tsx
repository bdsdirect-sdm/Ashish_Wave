import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import baseURL from '../api/axiosInstance';
import './All.css';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: values => {
            axios.post(`http://localhost:3000/login`, values)
                .then(response => {
                    toast.success('Login successful!');
                    
                    localStorage.setItem("token", response.data.token);
                    console.log(response);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1000);
                })
                .catch(error => {
                    toast.error('Login failed. Please try again.');
                });
        },
    });

    return (
        <div className="signup-page" id="login-page">
            <div className="left-part"></div>
            <div className="right-part">
                <h1 id="signup-header">Login Your Account</h1>
                <span id="rectangle-line"></span>
                <form id="signup-form" onSubmit={formik.handleSubmit}>
                    <div id="other-details">
                        <label htmlFor="email">Enter Email</label>
                        <br />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            maxLength={50}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <br />
                        {formik.errors.email && formik.touched.email ? (
                            <p className="form-errors">{formik.errors.email}</p>
                        ) : null}
                        <label htmlFor="password">Password</label>
                        <br />
                        <div className="password-container">
                            <input
                                id="password"
                                className="userPassword"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <img
                                src={showPassword ? "open_eye.png" : "close_eye.png"}
                                alt="Show Me/Hide Me"
                                onClick={() => setShowPassword(!showPassword)}
                                className="eye-icon"
                            />
                        </div>
                        {formik.errors.password && formik.touched.password ? (
                            <p className="form-errors">{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <div>
                        <Link to="/" id="login-signup-link">Sign Up</Link>
                    </div>
                    <button type="submit" id="login-signup-button">LOGIN</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;