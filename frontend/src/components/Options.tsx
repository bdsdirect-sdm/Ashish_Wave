import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./All.css";
import OptionsModel from "./OptionsModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Slide } from "react-toastify";
import BASE_URL from "../environment/env";

interface OptionsProps {
    profileIcon?: string;
    isUpdated: boolean;
}

const Options: React.FC<OptionsProps> = ({  isUpdated }) => {
    // console.log("peorororo "+profileIcon);   
    const [openModel, setOpenModel] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [userIcon, setUserIcon] = useState<string | undefined>();
    const [time, setTime] = useState<string>("");
    const navigate = useNavigate();

    const closeModel = () => setOpenModel(false);

    const checkCurrentTime = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setTime("Morning");
        } else if (currentHour >= 12 && currentHour < 18) {
            setTime("Afternoon");
        } else {
            setTime("Evening");
        }
    };

    useEffect(() => {
        checkCurrentTime();

        const intervalId = setInterval(() => {
            checkCurrentTime();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchIcon = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setUserName(response.data.user.first_name + " " + response.data.user.last_name);
            setUserIcon(response.data.user.profileIcon);
            localStorage.setItem("UserName", response.data.user.first_name + " " + response.data.user.last_name);
        } catch (err: any) {
            if (err.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                toast.error(err.response.data.message, {
                    autoClose: 300,
                });
            }
            toast.error(err.response.data.message, {
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchIcon();
    }, [isUpdated]);

    return (
        <div id="parent-user">
            <div className="user-options">
                <div id="logo-container">
                    <img id="logo" src="/Logo.png" alt="Logo" />
                </div>
                <div
                    id="dashboard"
                    className="options"
                    onClick={() => navigate(`/dashboard`)}
                >
                    <div id="circle">
                        <div id="upper-circle">
                            <span></span>
                            <span></span>
                        </div>
                        <div id="lower-circle">
                            <span id="light-circle"></span>
                            <span></span>
                        </div>
                    </div>
                    <p className="options-text">Dashboard</p>
                </div>
                <div
                    className="options"
                    onClick={() => navigate(`/profile`)}
                >
                    <div id="option-image">
                        <img src="/chart.png" alt="icon"></img>
                    </div>
                    <p className="options-text">My Profile</p>
                </div>
                <div
                    className="options"
                    onClick={() => navigate(`/preferences`)}
                >
                    <div id="option-image">
                        <img src="/chart.png" alt="icon"></img>
                    </div>
                    <p className="options-text">Preferences</p>
                </div>
                <div
                    className="options"
                    onClick={() => navigate(`/friends`)}
                >
                    <div id="option-image">
                        <img src="/chart.png" alt="icon"></img>
                    </div>
                    <p className="options-text">Friends</p>
                </div>
                <div
                    className="options"
                    onClick={() => navigate(`/waves`)}
                >
                    <div id="option-image">
                        <img src="/chart.png" alt="icon"></img>
                    </div>
                    <p className="options-text">Create Waves</p>
                </div>
                <div
                    className="options"
                    onClick={() => navigate(`/change-password`)}
                >
                    <div id="option-image">
                        <img src="/chart.png" alt="icon"></img>
                    </div>
                    <p className="options-text">Change Password</p>
                </div>
                <div
                    className="options"
                    id="logout"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                >
                    <div id="option-image">
                        <img src="/logout-icon.png" alt="icon"></img>
                    </div>
                    <p className="options-text">Log Out</p>
                </div>
            </div>
            <div id="navbaar">
                <img
                    id="user-icon"
                    src={

                        userIcon ? `${BASE_URL.BASE_URL}${userIcon}` : "/default-profile.png"
                    }
                    onClick={() => setOpenModel(!openModel)}
                ></img>
                <div id="user-name">
                    <p id="greeting">Good {time}</p>
                    <p id="name" onClick={() => setOpenModel(!openModel)}>
                        {userName}
                    </p>
                </div>
                {openModel && <OptionsModel closeModel={closeModel} id={id} />}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Options;