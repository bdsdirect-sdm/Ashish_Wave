import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FriendInfo from "./FriendInfo";

interface Request {
    id: string;
    inviterId: string;
    icon?: string;
    name: string;
    email: string;
    isAccepted: boolean;
}

interface FriendRequestsProps {
    isAccepted: boolean;
    setIsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}

function FriendRequests({ isAccepted, setIsAccepted }: FriendRequestsProps) {
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [friendId, setFriendId] = useState<string | null>(null);
    const [requests, setRequests] = useState<Request[]>([]);
    const { id } = useParams<{ id: string }>();

    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/getFriendRequest`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response && response.data.status) {
                setRequests(response.data.data);
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setRequests([]);
            } else {
                toast.error(err.response?.data?.message || "Error fetching requests", {
                    position: "bottom-right",
                    autoClose: 300,
                });
            }
        }
    };

    const approveRequest = async (requestId: string) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/friend-requests`,
                { id: requestId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status) {
                setIsAccepted(!isAccepted);
            }
        } catch (err) {
            console.error("Error approving request", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [isAccepted]);

    return (
        <div id="friends-container-main">
            <p id="friend-label">Requests</p>
            <div id="parent-user">
                {requests.map((item) => (
                    <div key={item.id} id="invited-user-container">
                        <img
                            src={item.icon || "/user.png"}
                            alt="Request Icon"
                            onClick={() => {
                                setFriendId(item.inviterId);
                                setOpenModel(true);
                            }}
                        />
                        <div
                            id="invited-user-detail"
                            onClick={() => {
                                setFriendId(item.inviterId);
                                setOpenModel(true);
                            }}
                        >
                            <p id="user-name">{item.name}</p>
                            <p id="user-email">{item.email}</p>
                        </div>
                        <div
                            id="status"
                            style={{
                                background: item.isAccepted ? "#49A15C" : "#b18d4b",
                            }}
                            onClick={() => approveRequest(item.id)}
                        >
                            <p>{item.isAccepted ? "Accepted" : "Confirm"}</p>
                        </div>
                    </div>
                ))}
                {requests.length === 0 && <h1 id="no-friends">No requests yet!</h1>}
            </div>
            {openModel && (
                <FriendInfo closeModel={() => setOpenModel(false)} friendId={friendId} />
            )}
        </div>
    );
}

export default FriendRequests;