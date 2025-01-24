import { Link, useNavigate } from "react-router-dom";
import "./All.css";
import React from "react";


interface OptionsModelProps {
    closeModel: () => void;
    
    
}



const OptionsModel: React.FC<OptionsModelProps> = ({ closeModel }) => {
    
    const navigate = useNavigate();

    return (
        <>
            <div
                id="options-model-wrapper"
                onClick={closeModel}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            ></div>
            <div
                id="options-model"
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "1 4px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                    height:"140px"
                }}
            >
                <Link className="options-text" to={`/profile`} style={{ display: "block", marginBottom: "10px" }} >
                    My Profile
                </Link>
                <Link className="options-text" to={`/preferences`} style={{ display: "block", marginBottom: "10px" }}>
                    Preferences
                </Link>
                <Link className="options-text" to={`/friends`} style={{ display: "block", marginBottom: "10px" }}>
                    Friends
                </Link>
                <Link className="options-text" to={`/waves`} style={{ display: "block", marginBottom: "10px" }}>
                    Create Waves
                </Link>
                <Link className="options-text" to={`/change-password`} style={{ display: "block", marginBottom: "10px" }}>
                    Change Password
                </Link>
                <button
                    className="options-text"
                    id="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}
                    style={{
                        display: "block",
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Log Out
                </button>
            </div>
        </>
    );
};

export default OptionsModel;