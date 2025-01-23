import "./All.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WaveInfo from "./WaveInfo";

const WavesList: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [openModel, setOpenModel] = useState(false);
    const [waveList, setWaveList] = useState<any[]>([]);
    const closeModel = () => setOpenModel(false);
    const [waveId, setWaveId] = useState<string | null>(null);
    const [posterName, setPosterName] = useState<string | null>(null);
    const [posterIcon, setPosterIcon] = useState<string | null>(null);
    const [waveImage, setWaveImage] = useState<string | null>(null);
    const [waveMessage, setWaveMessage] = useState<string | null>(null);

    const fetchWaves = async () => {
        try {
            
            const response = await axios.get(
                `http://localhost:3000/active_Waves`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(response.data,"response");
            if (response.data.waves) {
                setWaveList(response.data.waves);
            }
        } catch (err: any) {
            toast.error(err.response.data.message, {
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchWaves();
    }, []);

    return (
        <div className="wave-list-container">
            <p>Making waves</p>
            <div id="user-wave-container">
                {waveList.map((item, key) => (
                    <div
                        key={key}
                        id="user-waves"
                        onClick={() => {
                            setWaveId(item.id);
                            setWaveImage(item.image);
                            setWaveMessage(item.message);
                            setPosterName(`${item.firstName} ${item.lastName}`);
                            setPosterIcon(item.profileIcon);
                            setOpenModel(true);
                        }}
                    >
                        <img
                            id="user-img"
                            src={
                                item.profileIcon
                                    ? item.profileIcon
                                    : "/user.png"
                            }
                            alt="user"
                        />
                        <div id="user-wave-details">
                            <p id="user-id">{item.firstName}</p>
                            <p id="user-message">
                                {item.message.length > 20
                                    ? item.message.slice(0, 20) + " ...."
                                    : item.message}
                            </p>
                            <p id="follow-button">Follow</p>
                        </div>
                        {(key + 1) % 3 !== 0 ? <span id="line"></span> : null}
                    </div>
                ))}
                {waveList.length === 0 ? (
                    <h1 id="no-friends">No active waves!</h1>
                ) : null}
            </div>
            {openModel && (
                <WaveInfo
                    closeModel={closeModel}
                    waveId={waveId || ""}
                    waveImage={waveImage || ""}
                    waveMessage={waveMessage || ""}
                    posterIcon={posterIcon || ""}
                    posterName={posterName || ""}
                />
            )}
        </div>
    );
};

export default WavesList;