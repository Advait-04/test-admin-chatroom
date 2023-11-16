const express = require("express");
const router = express.Router();

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
} = require("../controllers/adminController");

router.patch("/api/admin/updateuserchatrooms", updateChatrooms);
router.patch("/api/admin/updateusernooftotalchats", updateNoOfTotalChats);
router.patch("/api/admin/updateusertotalusage", updateTotalUsage);

router.post("/api/admin/auth/login", adminLogin);
router.post("/api/admin/auth/signup", adminSignup);
router.post("/api/admin/adddashboarditem", addDashboardItem);

//yet to finish working of these end points
//so basically use get bottom user and top user and then use the result to call the add dashboard item
router.get("/api/admin/gettopuser", getTopUser);
router.get("/api/admin/getbottomuser", getBottomUser);
router.get("/api/admin/getdashboarditem", getDashboardItem);
router.get("/api/admin/getuser/:user", getUser);

module.exports = router;
