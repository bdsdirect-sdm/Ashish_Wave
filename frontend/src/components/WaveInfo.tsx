import "./All.css";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useFormik } from "formik";
// import { BASE_URL } from "";
import BASE_URL from '../environment/env';
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./waveInfo.css"
/* eslint-disable */

interface WaveInfoProps {
    closeModel: () => void;
    waveId: string;
    waveImage: string;
    waveMessage: string;
    posterIcon: string;
    posterName: string;
}

interface Comment {
    id: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

const WaveInfo: React.FC<WaveInfoProps> = ({
    closeModel,
    waveId,
    waveImage,
    waveMessage,
    // posterIcon,
    // posterName,
}) => {
    const [addComment, setAddComment] = useState(false);
    const [isCommentPosted, setIsCommentPosted] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [commentId, setCommentId] = useState<string | null>(null);
    const [id, setId] = useState<string | undefined>(undefined);
    const [posterIcon, setPosterIcon] = useState<string | null>(null);
    const [posterName, setPosterName] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
            setId(decodedToken.id);
        }
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(

                `${BASE_URL.BASE_URL}getComment/${waveId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },

                }
            );
            console.log(commentList, "commentList=-=-=-=-=-=-");
            if (response?.data) {
                setCommentList(response.data.comments);

            }
        } catch (err: any) {
            // toast.error(err.response?.data?.message || "Failed to fetch comments.", {
            //     autoClose: 300,
            // });
            // console.log(err.response?.data?.message || "Failed to fetch comments.");
        }
    };


    const fetchUser = async (id: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL.BASE_URL}user`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data?.status) {
                setPosterIcon(response.data.data.profileIcon);
                setPosterName(`${response.data.data.firstName} ${response.data.data.lastName}`);

            }

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch user.", {
                autoClose: 300,
            });
        }
    }

    const postComment = async (comment: string) => {
        try {
            const response = await axios.post(
                `${BASE_URL.BASE_URL}createComment`,
                { waveId, comment, commenterId: id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status) {
                setIsCommentPosted(!isCommentPosted);
                toast.success(response.data.message, {
                    autoClose: 300,
                });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to post comment.", {
                autoClose: 300,
            });
        }
    };

    const deleteComment = async (commentId: string) => {
        try {
            const response = await axios.delete(
                `${BASE_URL.BASE_URL}deleteComment`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: { id: commentId },
                }
            );
            if (response.data.status) {
                setIsDeleted(!isDeleted);
                toast.success(response.data.message, {
                    autoClose: 300,
                });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete comment.", {
                autoClose: 300,
            });
        }
    };

    const updateComment = async (comment: string) => {
        if (!commentId) return;

        try {
            const response = await axios.put(
                `${BASE_URL.BASE_URL}updateComment`,
                { id: commentId, comment },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.status) {
                setIsUpdated(!isUpdated);
                toast.success(response.data.message, {
                    autoClose: 300,
                });
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update comment.", {
                autoClose: 300,
            });
        }
    };

    useEffect(() => {
        fetchComments();
        if (id) {
            fetchUser(id);
        }
    }, [isCommentPosted, isDeleted, isUpdated, id]);

    const schema = Yup.object({
        comment: Yup.string()
            .min(5, "Minimum 5 characters!")
            .max(100, "Maximum 100 characters!")
            .required("Required!"),
    });

    const formik = useFormik({
        initialValues: { comment: "" },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {
            if (isEdit) {
                updateComment(values.comment);
            } else {
                postComment(values.comment);
            }
            resetForm();
            setAddComment(false);
        },
    });
    // console.log(commentList, "commentList=-=-=-=-=-=-");
    return (
        <>
            <div id="model-wrapper" onClick={closeModel}></div>
            <div id="wave-model">
                <div id="cover-color">
                    <h1>Details</h1>
                    <div id="user-profile">
                        <img
                            id="wave-user-icon"
                            src={posterIcon || "/user.png"}
                            alt="user"
                        />
                        <div id="creator-details">
                            <p id="creator-name">{posterName}</p>
                        </div>
                    </div>

                    <span id="image-height-line"></span>
                    <div id="image">
                        <img src={`${BASE_URL.BASE_URL}${waveImage}`} alt="wave" /></div>
                    <p>{waveMessage}</p>
                </div>
                <div id="comments-section">
                    <h2>Comments</h2>
                    {commentList.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.comment}</p>
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                            <button
                                onClick={() => {
                                    setCommentId(comment.id);
                                    setIsEdit(true);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                    {commentList.length === 0 && <p>No comments yet!</p>}
                </div>
                {addComment && (
                    <form onSubmit={formik.handleSubmit}>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formik.values.comment}
                            onChange={formik.handleChange}
                            placeholder="Add your comment"
                        />
                        {formik.errors.comment && <p>{formik.errors.comment}</p>}
                        <button type="submit">{isEdit ? "Update" : "Post"}</button>
                    </form>
                )}
                <button onClick={() => setAddComment(!addComment)}>
                    {addComment ? "Cancel" : "Add Comment"}
                </button>
            </div>
        </>
    );
};

export default WaveInfo;    
