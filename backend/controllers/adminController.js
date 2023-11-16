const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Dashboard = require("../models/dashboardModel");

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

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.login(username, password);
        res.status(200).json(admin);
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
};
