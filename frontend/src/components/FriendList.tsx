import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FriendInfo from "./FriendInfo";

interface Friend {
    friendId: string;
    icon?: string;
    inviteName: string;
    inviteEmail: string;
}

const FriendList: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [openModel, setOpenModel] = useState<boolean>(false);
    const [friendId, setFriendId] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    const fetchFriends = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/allfriends`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response && response?.data?.friends) {
                setFriends(response.data.friends);
            }
        } catch (err: any) {
            if (err.response?.status === 404) {
                setFriends([]);
            }
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);
    console.log(friends, "friendsList=-=-=-=-=-");
    return (
        <div id="friends-container-main">
            <p id="friend-label">Friends</p>
            <div id="parent-user">
                {friends.map((item) => (
                    <div
                        key={item.friendId}
                        id="invited-user-container"
                        onClick={() => {
                            setFriendId(item.friendId); // Set the selected friend's id
                            setOpenModel(true);  // Open the FriendInfo modal
                        }}
                    >
                        <img src={item.icon || "/user.png"} alt="Friend Icon" />
                        <div id="invited-user-detail">
                            <p id="user-name">{item.inviteName}</p>
                            <p id="user-email">{item.inviteEmail}</p>
                        </div>
                        <div
                            id="status"
                            style={{
                                background: "#49A15C",
                            }}
                        >
                            <p>Friends</p>
                        </div>
                    </div>
                ))}
                {friends.length === 0 && <h1 id="no-friends">No friends yet!</h1>}
            </div>
            {openModel && (
                <FriendInfo closeModel={() => setOpenModel(false)} friendId={friendId} />
            )}
        </div>
    );
}

export default FriendList;