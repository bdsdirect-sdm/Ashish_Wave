import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Options from './Options';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import BASE_URL from '../environment/env';

const CreateWaves: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const[userName, setuserName] = useState<string>('');
    const selectedImageName = ''; // Replace with actual selected image name logic
    const searchWaveList = [];
    // const userName = ''; // Replace with actual user name logic

    const [userDetails, setUserDetails] = useState<any>(null);
    console.log(userDetails);
    useEffect(() => {
        axios.get('http://localhost:3000/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(response => {
            setUserDetails(response.data.user);
            setProfilePhoto(response.data.user.profileIcon);
            setuserName(response.data.user.name);

        })
        .catch(error => {
            console.error('There was an error fetching the user details!', error);
        });
    }, []);
    const Formik = useFormik({
        initialValues: {
            message: '',
        },


        onSubmit: values => {
            // Handle form submission

            console.log('Form values:', values);
            axios.post('http://localhost:3000/createWave', values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

                .then(response => {
                    toast.success('Wave created successfully!');
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.error('There was an error creating the wave!', error);
                    toast.error('There was an error creating the wave!', error);
                });
        },
        validate: values => {
            const errors: { message?: string } = {};
            if (!values.message) {
                errors.message = 'Required';
            }
            return errors;
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle image change
    };

    const handleShowImageInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        
    };

    const handleWaveSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle wave search
    };

    const handleStatusChange = (id: number, status: boolean) => {
        // Handle status change
    };

    return (
        <div className="dashboard-wrapper">
            <div className="user-wrapper">
                <div id="preferences-header">
                    <img
                        id="left-arrow"
                        src="/left-arrow.png"
                        alt="Go Back"
                        onClick={() => {
                            navigate(`/user`);
                        }}
                    />
                    <h2>Create Waves</h2>
                </div>
                <div id="wave-container">
                    <div id="wave-img-container">
                        <img
                            id="profile-user-icon"
                            src={profilePhoto ? `${BASE_URL.BASE_URL}${profilePhoto}` : "/user.png"}
                            alt="icon"
                        />
                        <div id="upload-photo">
                            <h3 id="wave-username">{name}</h3>
                        </div>
                    </div>
                    <div id="wave-input">
                        <p id="wave-label">What do you want to share?</p>
                        <form onSubmit={Formik.handleSubmit}>
                            <input
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                            <input
                                type="text"
                                id="wave-image-input"
                                onClick={handleShowImageInput}
                                placeholder={
                                    selectedImageName
                                        ? selectedImageName
                                        : "Upload Photos"
                                }
                                readOnly
                            />
                            <textarea
                                id="wave-message-input"
                                name="message"
                                placeholder="Write something..."
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                                value={Formik.values.message}
                            />
                            {Formik.errors.message && Formik.touched.message ? (
                                <p className="form-errors formik-errors">
                                    {Formik.errors.message}
                                </p>
                            ) : null}

                            <button type="submit" id="create-wave-button">
                                Create Wave
                            </button>
                        </form>
                        <div id="search-wave">
                            <img
                                id="search-icon"
                                src="/search.png"
                                alt="Search"
                            />
                            <input
                                id="input-search-wave"
                                type="text"
                                placeholder="Search"
                                onChange={handleWaveSearch}
                            />
                        </div>
                        {searchWaveList.map((item, key) => (
                            <div key={key} id="parent-user">
                                <div id="wave-history-container">
                                    <img
                                        src={
                                            profilePhoto
                                                ? profilePhoto
                                                : "/user.png"
                                        }
                                        alt="Icon"
                                    />
                                    <div id="invited-user-detail">
                                        <p id="user-name">{userName}</p>
                                        <p id="wave-message">{item.message}</p>
                                    </div>
                                    <div
                                        id="status"
                                        style={{
                                            background: item.status
                                                ? "#02480d"
                                                : "#B50E03",
                                        }}
                                        onClick={() =>
                                            handleStatusChange(
                                                item.id,
                                                item.status
                                            )
                                        }
                                    >
                                        <p>
                                            {item.status
                                                ? "Active"
                                                : "In Active"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Options isUpdated={false} />
        </div>
    );
};

export default CreateWaves;