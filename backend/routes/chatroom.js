const express = require("express");
const router = express.Router();

const { sendChat, retrieveChat } = require("../controllers/chatroomController");

router.get("/retrievechat/:room", retrieveChat);
router.post("/sendchat", sendChat);

module.exports = router;
