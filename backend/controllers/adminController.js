const User = require("../models/userModel");

const updateChatrooms = async (req, res) => {
    const { email, chatroom } = req.body;

    try {
        const update = await User.updateChatrooms(email, chatroom);

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateNoOfTotalChats = async (req, res) => {
    const { email, updateValue } = req.body;

    try {
        const update = await User.updateNoOfTotalChats(email, updateValue);
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTotalUsage = async (req, res) => {
    const { email, updateValue } = req.body;

    try {
        const update = await User.updateTotalUsage(email, updateValue);
        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { updateChatrooms, updateNoOfTotalChats, updateTotalUsage };
