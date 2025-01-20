import { Router } from "express";
import { registerUser, loginUser, getUserDetails, updatePassword, createWave, getWaveDetails, getLatestWaves, upsertPreference, updateUser } from "../controllers/userController";
import loginValidation from "../middlewares/formValidation.ts/loginValidation";
import userAuthMiddleware from "../middlewares/userAuth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginValidation, loginUser);
router.put('/updatePassword',userAuthMiddleware, updatePassword);

router.get('/user',userAuthMiddleware, getUserDetails);

router.put("/Update_User", userAuthMiddleware, updateUser);
// router.get("/Get_User", userAuthMiddleware, get_User);

router.post("/createWave",userAuthMiddleware, createWave);
router.get("/getWaves/:id",userAuthMiddleware, getWaveDetails);

router.get("/Latest_Waves", userAuthMiddleware, getLatestWaves);

router.post("/preference", userAuthMiddleware, upsertPreference);
router.get("/preference", userAuthMiddleware, upsertPreference);
// router.post("/preference/:userId", userAuthMiddleware, upsertPreference);

// router.post("/Send_Friend", userAuthMiddleware, Send_Friend);
// router.get("/Get_Friends", userAuthMiddleware, Get_Friends);
// router.get("/Friend_Details/:id", userAuthMiddleware, Friend_Details);

// router.get("/Get_Preference", userAuthMiddleware, Get_Preference);
// router.post("/Create_Preference", userAuthMiddleware, Create_Preference);
export default router;