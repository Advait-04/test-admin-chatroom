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
} = require("../controllers/adminController");

router.patch("/api/admin/updateusernooftotalchats", updateNoOfTotalChats);

router.post("/api/admin/auth/signup", adminSignup);
router.post("/api/admin/adddashboarditem", addDashboardItem);

router.get("/api/admin/gettopuser", getTopUser);
router.get("/api/admin/getbottomuser", getBottomUser);

// --needed-- endpoints for frontend below

router.patch("/api/admin/updateusertotalusage", updateTotalUsage);
router.patch("/api/admin/updateuserchatrooms", updateChatrooms);

router.post("/api/admin/auth/login", adminLogin);
router.post("/api/admin/addconcurrentuser", addConcurrentUser);
router.post("/api/admin/removeconcurrentuser", removeConcurrentUser);

router.get("/api/admin/getdashboarditem", verifyToken, getDashboardItem);
router.get("/api/admin/getuser/:user", verifyToken, getUser);
router.get("/api/admin/getuser", verifyToken, getAllUser);
router.get("/api/admin/getchatrooms", verifyToken, getChatrooms);
router.get("/api/admin/getchatrooms/:chatroom", verifyToken, getChatroom);

module.exports = router;
