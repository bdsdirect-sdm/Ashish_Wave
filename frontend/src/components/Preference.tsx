import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Options from './Options';
import axios from 'axios';
import { toast } from 'react-toastify';

interface PreferenceFormValues {
    language: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    wakeTime: string;
    bedTime: string;
    weight: 'Kg' | 'lbs';
    height: 'cm' | 'ft/inches';
    bloodGlucose: 'mmo/l' | 'mg/dl';
    cholesterol: 'mmo/l' | 'mg/dl';
    bloodPressure: 'kPa' | 'mmHg';
    distance: 'km' | 'miles';
    systemEmails: boolean;
    memberServiceEmails: boolean;
    sms: boolean;
    phoneCall: boolean;
    post: boolean;
}

const Preference: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues: PreferenceFormValues = {
        language: 'English',
        breakfast: '',
        lunch: '',
        dinner: '',
        wakeTime: '',
        bedTime: '',
        weight: 'Kg',
        height: 'cm',
        bloodGlucose: 'mmo/l',
        cholesterol: 'mmo/l',
        bloodPressure: 'kPa',
        distance: 'km',
        systemEmails: false,
        memberServiceEmails: false,
        sms: false,
        phoneCall: false,
        post: false
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            axios.post(`http://localhost:3000/preference`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then(response => {
                    toast.success('Preferences updated successfully!');
                })
                .catch(error => {
                    toast.error('There was an error updating the preferences!');
                });
            console.log(values, 'values');
        },
    });

    const fetchPreference = () => {
        axios.get(`http://localhost:3000/preference`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => {
                const data = response.data;
                console.log(data, 'data=-=-=-=-=-=-==-=-=-=-');
                formik.setValues({
                    ...initialValues,
                    ...data
                });
            })
            .catch(() => {
                toast.error('There was an error fetching the preferences!');
            });
    };

    React.useEffect(() => {
        fetchPreference();
    }, []);

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
                    <h2>Preferences</h2>
                </div>
                <div id="preferences-container">
                    <form id="preference-form" onSubmit={formik.handleSubmit}>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="language">Language</label>
                                <br />
                                <select
                                    id="language"
                                    name="language"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.language}
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="breakfast">Breakfast</label>
                                <br />
                                <input
                                    id="breakfast"
                                    className="breakfast"
                                    name="breakfast"
                                    type="time"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.breakfast}
                                />
                            </div>
                        </div>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="lunch">Lunch</label>
                                <br />
                                <input
                                    id="lunch"
                                    className="lunch"
                                    name="lunch"
                                    type="time"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lunch}
                                />
                            </div>
                            <div id="preference-2">
                                <label htmlFor="dinner">Dinner</label>
                                <br />
                                <input
                                    id="dinner"
                                    className="dinner"
                                    name="dinner"
                                    type="time"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dinner}
                                />
                            </div>
                        </div>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="wake-time">Wake Time</label>
                                <br />
                                <input
                                    id="wake-time"
                                    className="wake-time"
                                    name="wakeTime"
                                    type="time"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.wakeTime}
                                />
                            </div>
                            <div id="preference-2">
                                <label htmlFor="bed-time">Bed Time</label>
                                <br />
                                <input
                                    id="bed-time"
                                    className="bed-time"
                                    name="bedTime"
                                    type="time"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bedTime}
                                />
                            </div>
                        </div>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="weight">Weight</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="weight"
                                            className="weight"
                                            name="weight"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="Kg"
                                            checked={formik.values.weight === "Kg"}
                                        />
                                        <p>Kg</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="weight"
                                            className="weight"
                                            name="weight"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="lbs"
                                            checked={formik.values.weight === "lbs"}
                                        />
                                        <p>lbs</p>
                                    </div>
                                </div>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="height">Height</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="height"
                                            className="height"
                                            name="height"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="cm"
                                            checked={formik.values.height === "cm"}
                                        />
                                        <p>cm</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="height"
                                            className="height"
                                            name="height"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="ft/inches"
                                            checked={formik.values.height === "ft/inches"}
                                        />
                                        <p>ft/inches</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="bloodGlucose">Blood Glucose</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="glucose"
                                            className="glucose"
                                            name="bloodGlucose"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="mmo/l"
                                            checked={formik.values.bloodGlucose === "mmo/l"}
                                        />
                                        <p>mmo/l</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="glucose"
                                            className="glucose"
                                            name="bloodGlucose"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="mg/dl"
                                            checked={formik.values.bloodGlucose === "mg/dl"}
                                        />
                                        <p>mg/dl</p>
                                    </div>
                                </div>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="cholesterol">Cholesterol</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="cholesterol"
                                            className="cholesterol"
                                            name="cholesterol"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="mmo/l"
                                            checked={formik.values.cholesterol === "mmo/l"}
                                        />
                                        <p>mmo/l</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="cholesterol"
                                            className="cholesterol"
                                            name="cholesterol"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="mg/dl"
                                            checked={formik.values.cholesterol === "mg/dl"}
                                        />
                                        <p>mg/dl</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="preference-details">
                            <div id="preference-1">
                                <label htmlFor="bloodPressure">Blood Pressure</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="blood-pressure"
                                            className="blood-pressure"
                                            name="bloodPressure"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="kPa"
                                            checked={formik.values.bloodPressure === "kPa"}
                                        />
                                        <p>kPa</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="blood-pressure"
                                            className="blood-pressure"
                                            name="bloodPressure"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="mmHg"
                                            checked={formik.values.bloodPressure === "mmHg"}
                                        />
                                        <p>mmHg</p>
                                    </div>
                                </div>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="distance">Distance</label>
                                <br />
                                <div id="radio-button">
                                    <div id="radio-button-input">
                                        <input
                                            id="distance"
                                            className="distance"
                                            name="distance"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="km"
                                            checked={formik.values.distance === "km"}
                                        />
                                        <p>km</p>
                                    </div>
                                    <div id="radio-button-input">
                                        <input
                                            id="distance"
                                            className="distance"
                                            name="distance"
                                            type="radio"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value="miles"
                                            checked={formik.values.distance === "miles"}
                                        />
                                        <p>miles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="communication-type">
                            <span></span>
                            <p id="communication">Communication Type</p>
                            <span></span>
                        </div>
                        <div id="preference-details" className="communication-details">
                            <div id="preference-1">
                                <label htmlFor="SystemEmails">System Emails</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="systemEmails"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.systemEmails}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="MemberServicesEmails">Member Services Emails</label>
                                <label className="switch">
                                    <input
                                        name="memberServiceEmails"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.memberServiceEmails}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div id="preference-details" className="communication-details">
                            <div id="preference-1">
                                <label htmlFor="sms">SMS</label>
                                <label className="switch">
                                    <input
                                        name="sms"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.sms}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div id="preference-2">
                                <label htmlFor="phoneCall">Phone Call</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="phoneCall"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.phoneCall}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div id="preference-details" className="communication-details">
                            <div id="preference-1">
                                <label htmlFor="Post">Post</label>
                                <label className="switch">
                                    <input
                                        name="post"
                                        type="checkbox"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.post}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div id="button-container">
                            <button type="submit" id="update-preference-btn">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Options isUpdated={false} />
        </div>
    );
};

export default Preference;