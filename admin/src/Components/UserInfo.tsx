import "./userInfo.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserInfo({ closeModel, userId }) {
    const [userInfo, setUserInfo] = useState({});
    const { id } = useParams();

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.5:3000/admin/${id}/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response && response.data && response.data.status) {
                setUserInfo(response.data.data);
            }
        } catch (err) {
            toast.error(err.response.data.message, {
                position: "bottom-right",
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <>
            <div id="model-wrapper" onClick={closeModel}></div>
            <div id="user-model">
                <div id="user-cover-color">
                    <h1>Details</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="25"
                        viewBox="0 0 23 25"
                        fill="none"
                        onClick={closeModel}
                    >
                        <ellipse
                            cx="11.4194"
                            cy="12.6786"
                            rx="10.7319"
                            ry="11.7643"
                            fill="#DECAA5"
                        />
                        <line
                            y1="-0.5"
                            x2="15.924"
                            y2="-0.5"
                            transform="matrix(0.673947 0.738779 -0.673947 0.738779 6.64966 7.44995)"
                            stroke="#B18D4B"
                        />
                        <line
                            y1="-0.5"
                            x2="15.924"
                            y2="-0.5"
                            transform="matrix(-0.673947 0.738779 0.673947 0.738779 17.3816 7.44995)"
                            stroke="#B18D4B"
                        />
                    </svg>
                </div>
                <div id="user-detail-container">
                    <div id="user-details-main">
                        <div className="grid-container">
                            <div className="item1">Full Name: </div>
                            <div className="item2">{userInfo.name}</div>
                            <div className="item3">Created&nbsp;At: </div>
                            <div className="item4">{userInfo.createdAt}</div>
                            <div className="item5">Email: </div>
                            <div className="item6">{userInfo.email}</div>
                            <div className="item7">Gender: </div>
                            <div className="item8">{userInfo.gender}</div>
                            <div className="item9">SSN: </div>
                            <div className="item10">{userInfo.ssn}</div>
                            <div className="item11">DOB: </div>
                            <div className="item12">{userInfo.dob}</div>
                            <div className="item13">Zip: </div>
                            <div className="item14">{userInfo.zip}</div>
                            <div className="item15">Kids: </div>
                            <div className="item16">{userInfo.kids}</div>
                            <div className="item17">Mobile&nbsp;Number: </div>
                            <div className="item18">{userInfo.phoneNumber}</div>
                            <div className="item19">Address: </div>
                            <div className="item20">{userInfo.address}</div>
                            <div className="item19">City: </div>
                            <div className="item20">{userInfo.city}</div>
                            <div className="item19">State: </div>
                            <div className="item20">{userInfo.state}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserInfo;