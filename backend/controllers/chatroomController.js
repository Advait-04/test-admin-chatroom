require("dotenv").config();

const Chatroom = require("../models/chatroomModel");
const Dashboard = require("../models/dashboardModel");
const User = require("../models/userModel");

const crypto = require("crypto-js");

const encryptText = (message) => {
    const text = crypto.AES.encrypt(
        message,
        process.env.ENCRYPTION_KEY
    ).toString();

    return text;
};

const decryptText = (message) => {
    const bytes = crypto.AES.decrypt(message, process.env.ENCRYPTION_KEY);
    const text = bytes.toString(crypto.enc.Utf8);

    return text;
};

const sendChat = async (req, res) => {
    const { room, user, text } = req.body;

    const encryptedText = encryptText(text);

    try {
        const chat = await Chatroom.sendChat(room, user, encryptedText);

        // updating particular users chat count
        const chatCountUpdate = await User.updateNoOfTotalChats(user, 1);

        //updating dashboard
        const topUser = await User.getTopUser();
        const bottomUser = await User.getBottomUser();

        const dashboardUpdate = await Dashboard.updateTopAndBottom(
            topUser,
            bottomUser
        );

        //updating logs of the current chat room
        const logUpdate = await Chatroom.updateLogs(room);

        res.status(200).send(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const retrieveChat = async (req, res) => {
    const room = req.params.room;

    try {
        const chatHistory = await Chatroom.retrieveChat(room);

        chatHistory.chat.forEach((chat, index) => {
            chatHistory.chat[index].text = decryptText(
                chatHistory.chat[index].text
            );
        });

        res.status(200).json({ data: chatHistory });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { sendChat, retrieveChat };
