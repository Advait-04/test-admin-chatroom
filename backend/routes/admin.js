const express = require("express");
const router = express.Router();

const {
    updateChatrooms,
    updateNoOfTotalChats,
    updateTotalUsage,
} = require("../controllers/adminController");

router.patch("/api/admin/updateuserchatrooms", updateChatrooms);
router.patch("/api/admin/updateusernooftotalchats", updateNoOfTotalChats);
router.patch("/api/admin/updateusertotalusage", updateTotalUsage);

module.exports = router;
