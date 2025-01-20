import { Link, useNavigate } from "react-router-dom";
import "./All.css";
import React from "react";


interface OptionsModelProps {
    closeModel: () => void;
    // id: string;
    
}
// const decodedToken = JSON.parse(atob(localStorage.getItem("token")?.split(".")[1] || ""));
// const id = decodedToken.id;


const OptionsModel: React.FC<OptionsModelProps> = ({ closeModel }) => {
    
    const navigate = useNavigate();

    return (
        <>
            <div id="options-model-wrapper" onClick={closeModel}></div>
            <div id="options-model">
                <Link className="options-text" to={`/profile`}>
                    My Profile
                </Link>
                <br />
                <Link className="options-text" to={`/preferences`}>
                    Preferences
                </Link>
                <br />
                <Link className="options-text" to={`/friends`}>
                    Friends
                </Link>
                <br />
                <Link className="options-text" to={`/waves`}>
                    Create Waves
                </Link>
                <br />
                <Link className="options-text" to={`/change-password`}>
                    Change Password
                </Link>
                <br />
                <button
                    className="options-text"
                    id="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                >
                    Log Out
                </button>
            </div>
        </>
    );
};

export default OptionsModel;