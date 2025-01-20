import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import './All.css';
import axios from 'axios';
import baseURL from '../api/axiosInstance';

const Signup: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phoneNumber: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: values => {
            axios.post(`http://localhost:3000/register`, values)
                .then(response => {
                    toast.success('Signup successful!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                })
                .catch(error => {
                    toast.error('Signup failed. Please try again.');
                });
        }
    });

    return (
        <div className="signup-page">
            <div className="left-part"></div>
            <div className="right-part">
                <h1 id="signup-header">Sign Up</h1>
                <span id="rectangle-line"></span>
                <form id="signup-form" onSubmit={formik.handleSubmit}>
                    <div id="name">
                        <div>
                            <label htmlFor="first-name">First Name</label>
                            <br />
                            <input
                                id="first-name"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.first_name && formik.touched.first_name ? (
                                <p className="form-errors">{formik.errors.first_name}</p>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="last-name">Last Name</label>
                            <br />
                            <input
                                id="last-name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.last_name && formik.touched.last_name ? (
                                <p className="form-errors">{formik.errors.last_name}</p>
                            ) : null}
                        </div>
                    </div>
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
                        <label htmlFor="phone">Enter Phone No.</label>
                        <br />
                        <input
                            id="number"
                            name="phoneNumber"
                            type="text"
                            placeholder="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <br />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                            <p className="form-errors">{formik.errors.phoneNumber}</p>
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
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <br />
                        <div className="password-container">
                            <input
                                id="confirm-password"
                                name="confirm_password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={formik.values.confirm_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <img
                                src={showConfirmPassword ? "open_eye.png" : "close_eye.png"}
                                alt="Show Me/Hide Me"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="eye-icon"
                            />
                        </div>
                        {formik.errors.confirm_password && formik.touched.confirm_password ? (
                            <p className="form-errors">{formik.errors.confirm_password}</p>
                        ) : null}
                    </div>
                    <div>
                        <Link to="/login" id="login-signup-link">Login</Link>
                    </div>
                    <button type="submit" id="login-signup-button">SIGN UP</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;