import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Options from './Options';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../environment/env';



const Profile: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isBasicDetails, setIsBasicDetails] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [ssn, setSsn] = useState<number | null>(null);
    const [phone_number, setPhoneNumber] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [marital_status, setMaritalStatus] = useState("");
    const [social, setSocial] = useState("");
    const [kids, setKids] = useState<number | null>(null);
    const [profileIcon, setProfileIcon] = useState<string | null>(null);
    const [id, setId] = useState("")
    const navigate = useNavigate();

    const fetchBasicData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const { user } = response.data;
            setId(user.id);
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
            setEmail(user.email || "");
            setSsn(user.ssn || null);
            setPhoneNumber(user.phone_number || "");
            setAddress1(user.address1 || "");
            setAddress2(user.address2 || "");
            setCity(user.city || "");
            setState(user.state || "");
            setZip(user.zip || "");
            setDob(user.dob || "");
            setGender(user.gender || "");
            setMaritalStatus(user.marital_status || "");
            setSocial(user.social || "");
            setKids(user.kids || null);
            setProfileIcon(user.profileIcon || null);
        } catch (err) {
            console.error("Failed to fetch basic data", err);
        }
    };

    useEffect(() => {
        fetchBasicData();
    }, [isUpdated]);

    const postImage = async (file: File) => {
        const formData = new FormData();
        formData.append("profileIcon", file);

        try {
            const response = await axios.put('http://localhost:3000/updateUserprofileIcon', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                setProfileIcon(response.data.profileIcon);
                toast.success("Profile icon updated successfully!");
            }

        } catch (err) {
            // Handle error here
            console.error("Failed to post image", err);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            postImage(file);
        }
    };

    const handleShowImageInput = () => {
        fileInputRef.current?.click();
    };

    const BasicDetails: React.FC = () => {
        const basicDetails = Yup.object({
            first_name: Yup.string()
                .min(2, "Minimum 2 characters!")
                .max(30, "Maximum 30 characters!")
                .required("Required!"),
            last_name: Yup.string().max(30, "Maximum 30 characters!"),
            email: Yup.string().email("Invalid email!").required("Required!"),
            ssn: Yup.string().matches(
                /^[0-9]\d{5}$/,
                "Invalid security number!"
            ),
            phone_number: Yup.string().matches(
                /^[6-9]\d{9}$/,
                "Invalid phone number!"
            ),
            address1: Yup.string()
                .min(2, "Minimum 2 characters!")
                .max(100, "Maximum 100 characters!")
                .required("Required!"),
            address2: Yup.string().max(100, "Maximum 100 characters!"),
            city: Yup.string()
                .min(1, "Minimum 1 characters!")
                .max(30, "Maximum 30 characters!")
                .required("Required!"),
            state: Yup.string()
                .min(1, "Minimum 1 characters!")
                .max(30, "Maximum 30 characters!")
                .required("Required!"),
            zip: Yup.number()
                .integer("Invalid Zip code!")
                .positive("Invalid Zip code!")
                .max(999999, "Length cannot be greater than 6!")
                .required("Required!"),
        });

        const basicValues = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            ssn: ssn ? ssn : null,
            phone_number: phone_number ? phone_number : "",
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip ? zip : "",
        };

        const updateBasicDetails = async (values: typeof basicValues) => {

            try {
                const response = await axios.put('http://localhost:3000/Update_User', values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200) {
                    setIsUpdated(!isUpdated);
                    toast.success("Basic details updated successfully!");
                }
            } catch (err) {
                console.error("Failed to update basic details", err);
            }
        };

        const BasicFormik = useFormik({
            initialValues: basicValues,
            validationSchema: basicDetails,
            onSubmit: (values) => {
                updateBasicDetails(values);
            },
        });

        return (
            <div id="basic-details-container">
                <form id="basic-form" onSubmit={BasicFormik.handleSubmit}>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <p
                                id="basic-details-label"
                                onClick={() => setIsBasicDetails(true)}
                            >
                                Basic Details
                            </p>
                            {isBasicDetails && (
                                <span id="basic-label-line"></span>
                            )}
                        </div>
                        <div id="basic-detail-1">
                            <p
                                id="personal-details-label"
                                onClick={() => setIsBasicDetails(false)}
                            >
                                Personal Details
                            </p>
                            {!isBasicDetails && (
                                <span id="personal-label-line"></span>
                            )}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.first_name &&
                                BasicFormik.touched.first_name ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.first_name}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.last_name &&
                                BasicFormik.touched.last_name ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.last_name}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <label htmlFor="email">
                                Enter Email <em>*</em>

                            </label>
                            <br />
                            <input
                                disabled
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.email}

                            />
                            {BasicFormik.errors.email &&
                                BasicFormik.touched.email ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.email}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
                            <label htmlFor="ssn">
                                Social Security (Numbers Only)
                            </label>
                            <br />
                            <input
                                id="ssn"
                                name="ssn"
                                type="text"
                                placeholder="452873"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.ssn}
                            />
                            {BasicFormik.errors.ssn &&
                                BasicFormik.touched.ssn ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.ssn}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <label htmlFor="phone_number">Mobile Number</label>
                            <br />
                            <input
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                placeholder="9987889999"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.phone_number}
                            />
                            {BasicFormik.errors.phone_number &&
                                BasicFormik.touched.phone_number ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.phone_number}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.address1 &&
                                BasicFormik.touched.address1 ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.address1}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.address2 &&
                                BasicFormik.touched.address2 ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.address2}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.city &&
                                BasicFormik.touched.city ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.city}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
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
                            {BasicFormik.errors.state &&
                                BasicFormik.touched.state ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.state}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
                            <label htmlFor="zip">
                                Home Zip Code <em>*</em>
                            </label>
                            <br />
                            <input
                                id="zip"
                                name="zip"
                                type="text"
                                placeholder="123456"
                                onChange={BasicFormik.handleChange}
                                onBlur={BasicFormik.handleBlur}
                                value={BasicFormik.values.zip}
                            />
                            {BasicFormik.errors.zip &&
                                BasicFormik.touched.zip ? (
                                <p className="form-errors">
                                    {BasicFormik.errors.zip}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="button-container">
                        <button type="submit" id="update-preference-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const PersonalDetails: React.FC = () => {
        const personalDetails = Yup.object({
            dob: Yup.date().required("Required!"),
            gender: Yup.string().required("Required!"),
            marital_status: Yup.string(),
            ssn: Yup.string().matches(
                /^[0-9]\d{5}$/,
                "Invalid security number!"
            ),
            social: Yup.string().max(50, "Maximum 50 characters!"),
            kids: Yup.number()
                .integer("Invalid detail!")
                .positive("Invalid detail!")
                .nullable(true)
                .min(0, "Invalid detail!"),
        });

        const personalValues = {
            dob: dob,
            gender: gender ? gender : "Male",
            marital_status: marital_status ? marital_status : "Unmarried",
            ssn: ssn ? ssn : "",
            social: social,
            kids: kids ? kids : 0,
        };

        const updatePersonalDetails = async (values: typeof personalValues) => {
            try {
                const response = await axios.put('http://localhost:3000/Update_User', values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200) {
                    setIsUpdated(!isUpdated);
                    toast.success("personal details updated successfully!");
                }
            } catch (err) {
                console.error("Failed to update personal details", err);
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
            <div id="basic-details-container">
                <form id="basic-form" onSubmit={PersonalFormik.handleSubmit}>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <p
                                id="basic-details-label"
                                onClick={() => setIsBasicDetails(true)}
                            >
                                Basic Details
                            </p>
                            {isBasicDetails && (
                                <span id="basic-label-line"></span>
                            )}
                        </div>
                        <div id="basic-detail-1">
                            <p
                                id="personal-details-label"
                                onClick={() => setIsBasicDetails(false)}
                            >
                                Personal Details
                            </p>
                            {!isBasicDetails && (
                                <span id="personal-label-line"></span>
                            )}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <label htmlFor="dob">
                                Date of Birth <em>*</em>
                            </label>
                            <br />
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                placeholder="Date of Birth"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.dob}
                            />
                            {PersonalFormik.errors.dob &&
                                PersonalFormik.touched.dob ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.dob}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
                            <label htmlFor="gender">
                                Gender <em>*</em>
                            </label>
                            <br />
                            <input
                                id="gender"
                                name="gender"
                                type="text"
                                placeholder="Gender"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.gender}
                            />
                            {PersonalFormik.errors.gender &&
                                PersonalFormik.touched.gender ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.gender}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <label htmlFor="marital_status">
                                Marital Status
                            </label>
                            <br />
                            <input
                                id="marital_status"
                                name="marital_status"
                                type="text"
                                placeholder="Marital Status"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.marital_status}
                            />
                            {PersonalFormik.errors.marital_status &&
                                PersonalFormik.touched.marital_status ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.marital_status}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
                            <label htmlFor="ssn">
                                Social Security (Numbers Only)
                            </label>
                            <br />
                            <input
                                id="ssn"
                                name="ssn"
                                type="text"
                                placeholder="452873"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.ssn}
                            />
                            {PersonalFormik.errors.ssn &&
                                PersonalFormik.touched.ssn ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.ssn}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="basic-details">
                        <div id="basic-detail-1">
                            <label htmlFor="social">Social</label>
                            <br />
                            <input
                                id="social"
                                name="social"
                                type="text"
                                placeholder="Social"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.social}
                            />
                            {PersonalFormik.errors.social &&
                                PersonalFormik.touched.social ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.social}
                                </p>
                            ) : null}
                        </div>
                        <div id="basic-detail-1">
                            <label htmlFor="kids">Kids</label>
                            <br />
                            <input
                                id="kids"
                                name="kids"
                                type="number"
                                placeholder="0"
                                onChange={PersonalFormik.handleChange}
                                onBlur={PersonalFormik.handleBlur}
                                value={PersonalFormik.values.kids}
                            />
                            {PersonalFormik.errors.kids &&
                                PersonalFormik.touched.kids ? (
                                <p className="form-errors">
                                    {PersonalFormik.errors.kids}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div id="button-container">
                        <button type="submit" id="update-preference-btn">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="dashboard-wrapper">
            <div className="user-wrapper">
                <div id="preferences-header">
                    <img
                        id="left-arrow"
                        src="/left-arrow.png"
                        alt="Go Back"
                        onClick={() => navigate(-1)}
                    />
                    <h2>Profile</h2>
                </div>
                <div id="img-container">
                    <img
                        src={profileIcon ? `${BASE_URL.BASE_URL}${profileIcon}` : "/user.png"}
                        id="profile-user-icon"
                        alt="Profile"
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    <button id='change-pic' onClick={handleShowImageInput}>Change Picture</button>
                </div>
                {isBasicDetails ? <BasicDetails /> : <PersonalDetails />}
            </div>
            <Options isUpdated={false} />

        </div>
    );
};

export default Profile;

