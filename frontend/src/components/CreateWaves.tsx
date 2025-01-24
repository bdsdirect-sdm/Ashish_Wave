import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Options from './Options';
import axios from 'axios';
import { toast } from 'react-toastify';
import Local from '../environment/env';

const CreateWaves: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profilePhoto, setProfilePhoto] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [selectedImageName, setSelectedImageName] = useState<string>(''); // Track selected image name
    const searchWaveList: any[] = [];
    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        axios.get(`${Local.BASE_URL}user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                setUserDetails(response.data.user);
                setProfilePhoto(response.data.user.profileIcon);
                setUserName(response.data.user.name);
            })
            .catch(error => {
                console.error('There was an error fetching the user details!', error);
            });
    }, []);

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('message', values.message);
            if (fileInputRef.current?.files?.[0]) {
                formData.append('image', fileInputRef.current.files[0]);
            }

            try {
                const response = await axios.post(`${Local.BASE_URL}createWave`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Wave created successfully!', response.data);
                toast.success('Wave created successfully!');
                navigate('/dashboard');
            } catch (error) {
                console.error('There was an error creating the wave!', error);
                toast.error('There was an error creating the wave!');
            }
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
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageName(file.name); // Set selected image name
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
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
                            navigate(-1);
                        }}
                    />
                    <h2>Create Waves</h2>
                </div>
                <div id="wave-container">
                    <div id="wave-img-container">
                        <img
                            id="profile-user-icon"
                            src={profilePhoto ? `${Local.BASE_URL}${profilePhoto}` : "/user.png"}
                            alt="icon"
                        />
                        <div id="upload-photo">
                            <h3 id="wave-username">{userName}</h3>
                        </div>
                    </div>
                    <div id="wave-input">
                        <p id="wave-label">What do you want to share?</p>
                        <form onSubmit={formik.handleSubmit}>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            {formik.errors.message && formik.touched.message ? (
                                <p className="form-errors formik-errors">
                                    {formik.errors.message}
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