const Chatroom = require("../models/chatroomModel");

const sendChat = async (req, res) => {
    const { room, user, text } = req.body;

    console.log(room, user, text);

    try {
        const chat = await Chatroom.sendChat(room, user, text);
        res.status(200).send(chat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const retrieveChat = async (req, res) => {
    const { room } = req.body;

    try {
        const chatHistory = await Chatroom.retrieveChat(room);
        res.status(200).json({ data: chatHistory });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { sendChat, retrieveChat };
