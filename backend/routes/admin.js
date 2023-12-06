const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authorizationMiddleware");
const {
    updateChatrooms,
    updateNoOfTotalChats,
    updateTotalUsage,
    adminLogin,
    adminSignup,
    addDashboardItem,
    getTopUser,
    getBottomUser,
    getDashboardItem,
    getUser,
    addConcurrentUser,
    removeConcurrentUser,
    getAllUser,
    getChatrooms,
    getChatroom,
    getChatroomDashboard,
    getUserDashboard,
} = require("../controllers/adminController");

router.patch("/updateusernooftotalchats", updateNoOfTotalChats);

router.post("/auth/signup", adminSignup);
router.post("/adddashboarditem", addDashboardItem);

router.get("/gettopuser", getTopUser);
router.get("/getbottomuser", getBottomUser);

// --needed-- endpoints for frontend below

router.patch("/updateusertotalusage", updateTotalUsage);
router.patch("/updateuserchatrooms", updateChatrooms);

router.post("/auth/login", adminLogin);
router.post("/addconcurrentuser", addConcurrentUser);
router.post("/removeconcurrentuser", removeConcurrentUser);

router.get("/getdashboarditem", verifyToken, getDashboardItem);
router.get("/getuser/:user", verifyToken, getUser);
router.get("/getuser", verifyToken, getAllUser);
router.get("/getchatrooms", verifyToken, getChatrooms);
router.get("/getchatrooms/:chatroom", verifyToken, getChatroom);
router.get(
    "/getchatroomdashboard/:chatroom",
    verifyToken,
    getChatroomDashboard
);
router.get("/getuserdashboard/:email", verifyToken, getUserDashboard);

module.exports = router;
