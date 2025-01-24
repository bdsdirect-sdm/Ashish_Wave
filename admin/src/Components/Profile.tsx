import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./editUser.css";

const Profile: React.FC = () => {
    const [isBasicDetails, setIsBasicDetails] = useState(true);
    const [profileIcon, setProfileIcon] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleShowImageInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileIcon(e.target?.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const BasicDetails = () => {
        const BasicFormik = useFormik({
            initialValues: {
                first_name: '',
                last_name: '',
                email: '',
                ssn: '',
                phone_number: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
            },
            validationSchema: Yup.object({
                first_name: Yup.string().required('Required!'),
                last_name: Yup.string(),
                email: Yup.string().email('Invalid email!').required('Required!'),
                ssn: Yup.string().matches(/^[0-9]{6}$/, 'Invalid security number!'),
                phone_number: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number!'),
                address1: Yup.string().required('Required!'),
                address2: Yup.string(),
                city: Yup.string().required('Required!'),
                state: Yup.string().required('Required!'),
                zip: Yup.string().matches(/^[0-9]{6}$/, 'Invalid zip code!'),
            }),
            onSubmit: (values) => {
                console.log(values);
            },
        });

        return (
            <div id="basic-detail-container">
                <form id="basic-info-form" onSubmit={BasicFormik.handleSubmit}>
                    <div id="basic-informations">
                        <div id="basic-details-1">
                            <p id="basic-detail-label" onClick={() => setIsBasicDetails(true)}>
                                Basic Details
                            </p>
                            {isBasicDetails && <span id="basic-details-bottom-line"></span>}
                        </div>
                        <div id="basic-details-1">
                            <p id="personal-detail-label" onClick={() => setIsBasicDetails(false)}>
                                Personal Details
                            </p>
                            {!isBasicDetails && <span id="personal-details-bottom-line"></span>}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="first_name">
                                First Name <em>*</em>
                            </label>
                            <br />
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.first_name}
                            />
                            {BasicFormik.errors.first_name && BasicFormik.touched.first_name ? (
                                <p className="form-errors">{BasicFormik.errors.first_name}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="last_name">Last Name</label>
                            <br />
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.last_name}
                            />
                            {BasicFormik.errors.last_name && BasicFormik.touched.last_name ? (
                                <p className="form-errors">{BasicFormik.errors.last_name}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="email">
                                Enter Email <em>*</em>
                            </label>
                            <br />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.email}
                            />
                            {BasicFormik.errors.email && BasicFormik.touched.email ? (
                                <p className="form-errors">{BasicFormik.errors.email}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="ssn">Social Security (Numbers Only)</label>
                            <br />
                            <input
                                id="ssn"
                                name="ssn"
                                type="number"
                                placeholder="452873"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.ssn}
                            />
                            {BasicFormik.errors.ssn && BasicFormik.touched.ssn ? (
                                <p className="form-errors">{BasicFormik.errors.ssn}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="phone_number">Mobile Number</label>
                            <br />
                            <input
                                id="phone_number"
                                name="phone_number"
                                type="number"
                                placeholder="9987889999"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.phone_number}
                            />
                            {BasicFormik.errors.phone_number && BasicFormik.touched.phone_number ? (
                                <p className="form-errors">{BasicFormik.errors.phone_number}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="address1">
                                Address One <em>*</em>
                            </label>
                            <br />
                            <input
                                id="address1"
                                name="address1"
                                type="text"
                                placeholder="Address"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.address1}
                            />
                            {BasicFormik.errors.address1 && BasicFormik.touched.address1 ? (
                                <p className="form-errors">{BasicFormik.errors.address1}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="address2">Address Two</label>
                            <br />
                            <input
                                id="address2"
                                name="address2"
                                type="text"
                                placeholder="Address"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.address2}
                            />
                            {BasicFormik.errors.address2 && BasicFormik.touched.address2 ? (
                                <p className="form-errors">{BasicFormik.errors.address2}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="city">
                                City <em>*</em>
                            </label>
                            <br />
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="City"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.city}
                            />
                            {BasicFormik.errors.city && BasicFormik.touched.city ? (
                                <p className="form-errors">{BasicFormik.errors.city}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="state">
                                State <em>*</em>
                            </label>
                            <br />
                            <input
                                id="state"
                                name="state"
                                type="text"
                                placeholder="State"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.state}
                            />
                            {BasicFormik.errors.state && BasicFormik.touched.state ? (
                                <p className="form-errors">{BasicFormik.errors.state}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="zip">
                                Home Zip Code <em>*</em>
                            </label>
                            <br />
                            <input
                                id="zip"
                                name="zip"
                                type="number"
                                placeholder="123456"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.zip}
                            />
                            {BasicFormik.errors.zip && BasicFormik.touched.zip ? (
                                <p className="form-errors">{BasicFormik.errors.zip}</p>
                            ) : null}
                        </div>
                    </div>
                    <div id="update-button-container">
                        <button type="submit" id="update-profile-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const PersonalDetails = () => {
        const personalDetails = Yup.object({
            dob: Yup.date().required('Required!'),
            gender: Yup.string().required('Required!'),
            marital_status: Yup.string(),
            ssn: Yup.string().matches(/^[0-9]{6}$/, 'Invalid security number!'),
            social: Yup.string().max(50, 'Maximum 50 characters!'),
            kids: Yup.number().integer().positive().nullable(true).min(0, 'Invalid detail!'),
        });

        const personalValues = {
            dob: '',
            gender: 'Male',
            marital_status: 'Unmarried',
            ssn: '',
            social: '',
            kids: 0,
        };

        const updatePersonalDetails = async (values: any) => {
            try {
                const data = {
                    dob: values.dob,
                    gender: values.gender,
                    marital_status: values.marital_status,
                    ssn: parseInt(values.ssn),
                    social: values.social,
                    kids: parseInt(values.kids),
                };
                const response = await axios.put(
                    `http://127.0.0.5:3000/admin/${id}/users/${userId}/personal-details`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                if (response.data.status) {
                    setIsUpdated(!isUpdated);
                }
                toast.success(response.data.message, {
                    position: 'bottom-right',
                    autoClose: 300,
                });
            } catch (err) {
                toast.error(err.response.data.message, {
                    position: 'bottom-right',
                    autoClose: 300,
                });
            }
        };

        const PersonalFormik = useFormik({
            initialValues: personalValues,
            validationSchema: personalDetails,
            onSubmit: (values) => {
                updatePersonalDetails(values);
            },
        });

        return (
            <div id="basic-detail-container">
                <form id="basic-info-form" onSubmit={PersonalFormik.handleSubmit}>
                    <div id="basic-informations">
                        <div id="basic-details-1">
                            <p id="basic-detail-label" onClick={() => setIsBasicDetails(true)}>
                                Basic Details
                            </p>
                            {isBasicDetails && <span id="basic-details-bottom-line"></span>}
                        </div>
                        <div id="basic-details-1">
                            <p id="personal-detail-label" onClick={() => setIsBasicDetails(false)}>
                                Personal Details
                            </p>
                            {!isBasicDetails && <span id="personal-details-bottom-line"></span>}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="dob">
                                DOB <em>*</em>
                            </label>
                            <br />
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.dob}
                            />
                            {PersonalFormik.errors.dob && PersonalFormik.touched.dob ? (
                                <p className="form-errors">{PersonalFormik.errors.dob}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="gender">
                                Gender <em>*</em>
                            </label>
                            <br />
                            <select
                                id="gender"
                                name="gender"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {PersonalFormik.errors.gender && PersonalFormik.touched.gender ? (
                                <p className="form-errors">{PersonalFormik.errors.gender}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="marital_status">Marital Status</label>
                            <br />
                            <select
                                id="marital_status"
                                name="marital_status"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.marital_status}
                            >
                                <option value="Unmarried">Unmarried</option>
                                <option value="Married">Married</option>
                            </select>
                            {PersonalFormik.errors.marital_status && PersonalFormik.touched.marital_status ? (
                                <p className="form-errors">{PersonalFormik.errors.marital_status}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="ssn">Social Security (Numbers Only)</label>
                            <br />
                            <input
                                id="ssn"
                                name="ssn"
                                type="number"
                                placeholder="452873"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.ssn}
                            />
                            {PersonalFormik.errors.ssn && PersonalFormik.touched.ssn ? (
                                <p className="form-errors">{PersonalFormik.errors.ssn}</p>
                            ) : null}
                        </div>
                    </div>
                    <div className="basic-details">
                        <div id="basic-details-1">
                            <label htmlFor="social">Social</label>
                            <br />
                            <input
                                id="social"
                                name="social"
                                type="text"
                                placeholder="Facebook"
                                value={PersonalFormik.values.social}
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                            />
                            {PersonalFormik.errors.social && PersonalFormik.touched.social ? (
                                <p className="form-errors">{PersonalFormik.errors.social}</p>
                            ) : null}
                        </div>
                        <div id="basic-details-1">
                            <label htmlFor="kids">Kids (If Any)</label>
                            <br />
                            <input
                                id="kids"
                                name="kids"
                                type="number"
                                placeholder="0"
                                value={PersonalFormik.values.kids}
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                            />
                            {PersonalFormik.errors.kids && PersonalFormik.touched.kids ? (
                                <p className="form-errors">{PersonalFormik.errors.kids}</p>
                            ) : null}
                        </div>
                    </div>
                    <div id="update-button-container">
                        <button type="submit" id="update-profile-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="user-info-wrapper">
            <div id="user-img-container">
                <img id="user-profile-icon" src={profileIcon ? profileIcon : '/user.png'} alt="icon" />
                <div id="upload-photo-div">
                    <h3>Upload a new photo</h3>
                    <p>{selectedImage && selectedImage.name ? selectedImage.name : 'Profile-pic.jpg'}</p>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
                <button id="change-picture" onClick={handleShowImageInput}>
                    Change Picture
                </button>
            </div>
            <div>
                <p id="change-info-label">Change Information</p>
            </div>
            {isBasicDetails ? <BasicDetails /> : <PersonalDetails />}
        </div>
    );
};

export default Profile;