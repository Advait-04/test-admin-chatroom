const express = require("express");
const router = express.Router();

const { sendChat, retrieveChat } = require("../controllers/chatroomController");

router.post("/api/chats/retrievechat", retrieveChat);
router.post("/api/chats/sendchat", sendChat);

module.exports = router;
