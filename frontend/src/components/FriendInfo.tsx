import "./All.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FriendInfoProps {
    closeModel: () => void;
    friendId: string;
}

const FriendInfo: React.FC<FriendInfoProps> = ({ closeModel, friendId }) => {
    const [friendInfo, setFriendInfo] = useState<any>({});

    const fetchFriendDetail = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/getFriendInfo/${friendId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response && response.data && response.data.status) {
                setFriendInfo(response.data.friendRequest); // Update to `friendRequest`
            } else {
                toast.error("Friend details not found", { autoClose: 300 });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch friend details", {
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchFriendDetail();
    }, []);

    return (
        <>
            <div id="model-wrapper" onClick={closeModel}></div>
            <div id="wave-model">
                <div id="friend-cover-color">
                    <h1>Details</h1>
                    <div id="user-profile">
                        <img
                            id="friend-user-icon"
                            src={
                                friendInfo.profileIcon
                                    ? friendInfo.profileIcon
                                    : "/user.png"
                            }
                            alt="user"
                        />
                        <div id="creator-details">
                            <p id="friend-name">{friendInfo.name}</p>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FriendInfo;