import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Options from './Options';
import axios from 'axios';
import { toast } from 'react-toastify';

const InviteFriends: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const counter = 1; // Replace with actual counter logic
    const userName = localStorage.getItem('UserName');

    const Formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required')
        }),
        onSubmit: values => {
            axios.post('http://localhost:3000/sendFriendRequest', 
                {
                    inviteName: values.name,
                    inviteEmail: values.email,
                    inviteMessage: values.message
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            .then(response => {
                console.log('Friend invited successfully:', response.data);
                toast.success('Friend invited successfully');
            })
            .catch(error => {
                console.error('There was an error inviting the friend:', error);
                toast.error('There was an error inviting the friend');
            });
            console.log(values);
        }
    });

    return (
        <div className="dashboard-wrapper">
            <div id="friend-dashboard">
                <div className="user-wrapper">
                    <div id="friends-header">
                        <img
                            id="left-arrow"
                            src="/left-arrow.png"
                            onClick={() => navigate(`/user/${id}/friends`)}
                        />
                        <h2>Friends</h2>
                    </div>
                    <p id="friends-header-paragraph">
                        Invites some friends {userName} , show them your Waves and
                        let’s see what they can do!
                    </p>
                    <div id="friends-container">
                        <div id="friend-count">
                            <h4>Friend #{counter}</h4>
                        </div>
                        <div id="friend">
                            <form
                                id="invite-friends-form"
                                onSubmit={Formik.handleSubmit}
                            >
                                <div id="name-email-wrapper">
                                    <div id="friend-details">
                                        <label htmlFor="name">Full Name</label>
                                        <br />
                                        <div className="friend-details-container">
                                            <input
                                                name="name"
                                                type="text"
                                                placeholder="Full Name"
                                                value={Formik.values.name}
                                                onChange={Formik.handleChange}
                                                onBlur={Formik.handleBlur}
                                            />
                                        </div>
                                        {Formik.errors.name &&
                                        Formik.touched.name ? (
                                            <p className="form-errors">
                                                {Formik.errors.name}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div id="friend-details">
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                        <br />
                                        <div className="friend-details-container">
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                value={Formik.values.email}
                                                onChange={Formik.handleChange}
                                                onBlur={Formik.handleBlur}
                                            />
                                        </div>
                                        {Formik.errors.email &&
                                        Formik.touched.email ? (
                                            <p className="form-errors">
                                                {Formik.errors.email}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div id="message-container">
                                    <label htmlFor="message">Message</label>
                                    <br />
                                    <div className="friend-details-container">
                                        <input
                                            id="message"
                                            name="message"
                                            type="text"
                                            placeholder="Message"
                                            value={Formik.values.message}
                                            onChange={Formik.handleChange}
                                            onBlur={Formik.handleBlur}
                                        />
                                    </div>
                                    {Formik.errors.message &&
                                    Formik.touched.message ? (
                                        <p className="form-errors">
                                            {Formik.errors.message}
                                        </p>
                                    ) : null}
                                </div>
                                <div id="add-more">
                                    <p>+ Add More</p>
                                </div>
                                <div id="friends-button-container">
                                    <button type="submit" id="update-button">
                                        Friends
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Options isUpdated={false}  />
        </div>
    );
};

export default InviteFriends;