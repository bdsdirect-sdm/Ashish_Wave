import { Router } from "express";
import { registerUser, loginUser, getUserDetails, updatePassword, createWave, getWaveDetails, getLatestWaves, upsertPreference, updateUser, getAllActiveWaves, createComment, getCommentsByWaveId, getCommentDetails, updateComment, deleteComment, updateUserprofileIcon, getAllFriends, getFriendRequestDetails, getFriendsList, sendFriendRequest, getFriendDetails, deleteWave } from "../controllers/userController";
import loginValidation from "../middlewares/formValidation.ts/loginValidation";
import userAuthMiddleware from "../middlewares/userAuth";
import { adminSignup, adminLogin, getUserAndWaveCounts, getAllUsers, changeUserStatus, deleteUser, getUserAllDetails, getWaveList, changeWaveStatus, updateWave, getUserCount } from "../controllers/adminController";
// import { adminLogin, adminSignup } from "../controllers/adminController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginValidation, loginUser);
router.put('/updatePassword', userAuthMiddleware, updatePassword);
router.put('/updateUserprofileIcon', userAuthMiddleware, updateUserprofileIcon);

router.get('/user', userAuthMiddleware, getUserDetails);

router.put("/Update_User", userAuthMiddleware, updateUser);
// router.get("/Get_User", userAuthMiddleware, get_User);

router.post("/createWave", userAuthMiddleware, createWave);
router.get("/getWaves/:id", userAuthMiddleware, getWaveDetails);
router.get("/active_Waves", userAuthMiddleware, getAllActiveWaves);
router.get("/Latest_Waves", userAuthMiddleware, getLatestWaves);


router.post("/createComment", userAuthMiddleware, createComment);
// router.get("/getComments/:id", userAuthMiddleware, getCommentDetails);
router.get("/getComment/:id", userAuthMiddleware, getCommentsByWaveId);
router.put("/updateComment", userAuthMiddleware, updateComment);
router.delete("/deleteComment", userAuthMiddleware, deleteComment);


router.post("/preference", userAuthMiddleware, upsertPreference);
router.get("/preference", userAuthMiddleware, upsertPreference);
// router.post("/preference/:userId", userAuthMiddleware, upsertPreference);

router.post("/sendFriendRequest", userAuthMiddleware, sendFriendRequest);
router.get("/allfriends", userAuthMiddleware, getAllFriends);
router.get("/getFriendRequest", userAuthMiddleware, getFriendRequestDetails);
router.get("/getFriendAccepted", userAuthMiddleware, getFriendsList);
router.get("/getFriendInfo/:id", userAuthMiddleware, getFriendDetails);
// router.post("/Send_Friend", userAuthMiddleware, Send_Friend);
// router.get("/Get_Friends", userAuthMiddleware, Get_Friends);
// router.get("/Friend_Details/:id", userAuthMiddleware, Friend_Details);

// router.get("/Get_Preference", userAuthMiddleware, Get_Preference);
// router.post("/Create_Preference", userAuthMiddleware, Create_Preference);

//Admin
router.post("/signup", adminSignup);
router.post("/admin/login", adminLogin);
// router.get("/userCount", getUserAndWaveCounts);
router.get("/Count", userAuthMiddleware, getUserAndWaveCounts);
router.get("/allusers", userAuthMiddleware, getAllUsers);
router.post("/changeUserStatus", userAuthMiddleware, changeUserStatus);
router.delete("/deleteUser", userAuthMiddleware, deleteUser);
router.get("/userDetails/:id", userAuthMiddleware, getUserAllDetails);
router.get("/WaveList", userAuthMiddleware, getWaveList);
router.post("/changeWaveStatus", userAuthMiddleware, changeWaveStatus);
router.delete("/deleteWave", userAuthMiddleware, deleteWave);
router.post("/updateWave", userAuthMiddleware, updateWave);
router.get("/userCount", userAuthMiddleware, getUserCount);
export default router;