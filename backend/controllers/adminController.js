require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Dashboard = require("../models/dashboardModel");
const Chatroom = require("../models/chatroomModel");

const updateChatrooms = async (req, res) => {
    const { email, chatrooms } = req.body;

    try {
        const update = await User.updateChatrooms(email, chatrooms);

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

        const topUser = await User.getTopUser();
        const bottomUser = await User.getBottomUser();

        const dashboardUpdate = await Dashboard.updateTopAndBottom(
            topUser,
            bottomUser
        );

        res.status(200).json(update);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.login(username, password);

        const authToken = jwt.sign(
            { username, priv: "admin" },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({ authToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const adminSignup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.signup(username, password);
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
};

const addDashboardItem = async (req, res) => {
    const { concurrentusers, topuser, bottomuser } = req.body;
    try {
        const dashboard = await Dashboard.addDashboardItem(
            concurrentusers,
            topuser,
            bottomuser
        );
        res.status(200).json(dashboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTopUser = async (req, res) => {
    try {
        const users = await User.getTopUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBottomUser = async (req, res) => {
    try {
        const users = await User.getBottomUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDashboardItem = async (req, res) => {
    try {
        const topUser = await User.getTopUser();
        const bottomUser = await User.getBottomUser();

        const dashboardUpdate = await Dashboard.updateTopAndBottom(
            topUser,
            bottomUser
        );

        const dashboardItem = await Dashboard.getDashboardItem();
        res.status(200).json(dashboardItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    const { user } = req.params;
    try {
        const userObj = await User.getUser(user);
        res.status(200).json(userObj);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addConcurrentUser = async (req, res) => {
    const { user } = req.body;

    try {
        const users = await Dashboard.addConcurrentUser(user);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeConcurrentUser = async (req, res) => {
    const { user } = req.body;

    try {
        const users = await Dashboard.removeConcurrentUser(user);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.getAllUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.getChatrooms();
        res.status(200).json(chatrooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getChatroom = async (req, res) => {
    const { chatroom } = req.params;

    try {
        const chatroomObject = await Chatroom.getChatroom(chatroom);
        res.status(200).json(chatroomObject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getChatroomDashboard = async (req, res) => {
    const { chatroom } = req.params;

    try {
        const chatroomDashboardObject = await Chatroom.getChatroomDashboard(
            chatroom
        );
        res.status(200).json(chatroomDashboardObject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserDashboard = async (req, res) => {
    const { email } = req.params;

    try {
        const userObj = await User.getUser(email);

        const result = await Promise.all(
            userObj.logs.chatrooms.map((room) =>
                Chatroom.getMessageCountByUser(room, email)
            )
        );

        res.status(200).json({
            email,
            logs: userObj.logs,
            chartdata: result,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
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
};
