import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
// import axios from  'axios';

import api from '../api/axiosInstance';


import { toast } from 'react-toastify';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const Formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
            name: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Required'),
            name: Yup.string().required('Required')
        }),
        onSubmit: values => {
            api.post('http://localhost:3000/signup', values)
                .then(response => {
                    console.log('Signup successful!', response);
                    toast.success('Signup successful!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                })
                .catch(error => {
                    toast.error('Signup failed. Please try again.');
                    console.error('There was an error signing up!', error);
                });
        }
    });

    return (
        <div id="signup-page">
            <div id="signup-form">
                <div id="signup-header">
                    <h5>SIGNUP FORM</h5>
                    <h1>Register</h1>
                </div>
                <form
                    id="signup-details-container"
                    onSubmit={Formik.handleSubmit}
                >
                    <label htmlFor="email" className="input-labels">
                        Email <em className="star">*</em>
                    </label>
                    <br />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.email}
                    />
                    <br />
                    {Formik.errors.email && Formik.touched.email ? (
                        <p className="form-errors">{Formik.errors.email}</p>
                    ) : null}
                    <label htmlFor="new-password" className="input-labels">
                        New Password <em className="star">*</em>
                    </label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="New Password"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.password}
                    />
                    <br />
                    {Formik.errors.password && Formik.touched.password ? (
                        <p className="form-errors">{Formik.errors.password}</p>
                    ) : null}
                    <label htmlFor="confirm-password" className="input-labels">
                        Confirm Password <em className="star">*</em>
                    </label>
                    <br />
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm Password"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.confirm_password}
                    />
                    <br />
                    {Formik.errors.confirm_password &&
                        Formik.touched.confirm_password ? (
                        <p className="form-errors">
                            {Formik.errors.confirm_password}
                        </p>
                    ) : null}
                    <label htmlFor="name" className="input-labels">
                        Full Name <em className="star">*</em>
                    </label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Full Name"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.name}
                    />
                    <br />
                    {Formik.errors.name && Formik.touched.name ? (
                        <p className="form-errors">{Formik.errors.name}</p>
                    ) : null}
                    <button type="submit" id="register-btn">
                        Register Now
                    </button>
                    <p id="login-paragraph">
                        If you already have an account?&nbsp;
                        <Link to="/login" id="login-link">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;