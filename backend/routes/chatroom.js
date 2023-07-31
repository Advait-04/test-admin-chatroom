const express = require("express");
const router = express.Router();

const { sendChat, retrieveChat } = require("../controllers/chatroomController");

router.get("/api/chats/retrievechat/:room", retrieveChat);
router.post("/api/chats/sendchat", sendChat);

module.exports = router;
