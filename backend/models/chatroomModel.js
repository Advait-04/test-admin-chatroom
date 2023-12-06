const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        default: function () {
            const d = new Date().toISOString();
            return d;
        },
    },
});

const userSchema = new Schema({
    user: {
        type: String,
    },
    messagecount: {
        type: Number,
    },
});

const logSchema = new Schema({
    totalchats: {
        type: Number,
        required: true,
    },
    topuser: {
        type: userSchema,
        required: true,
    },
    bottomuser: {
        type: userSchema,
        required: true,
    },
});

const chatroomSchema = new Schema({
    room: {
        type: String,
        required: true,
        unique: true,
    },
    chat: [
        {
            type: chatSchema,
            required: true,
        },
    ],

    logs: {
        type: logSchema,
        required: true,
    },
});

// static insert method
chatroomSchema.statics.sendChat = async function (room, user, text) {
    if (!room || !user || !text) {
        throw Error("All fields are required");
    }

    const chatroom = await this.findOne({ room });

    if (chatroom) {
        const chat = await this.updateOne(
            { room: room },
            { $push: { chat: [{ user, text }] } }
        );

        return chat;
    } else {
        const logObj = {
            totalchats: 0,
            topuser: {},
            bottomuser: {},
        };

        const chat = this.create({
            room,
            chat: [{ user, text }],
            logs: logObj,
        });
        return chat;
    }
};

// static get method
chatroomSchema.statics.retrieveChat = async function (room) {
    const chatroom = await this.findOne({ room });

    if (!chatroom) {
        return { room, chat: [] };
    } else {
        return chatroom;
    }
};

//
chatroomSchema.statics.updateLogs = async function (room) {
    const chatroom = await this.findOne({ room });

    if (!chatroom) {
        throw Error("Chatroom does not exist");
    }

    const userFreq = await this.aggregate([
        { $match: { room } },
        { $unwind: "$chat" },
        { $sortByCount: "$chat.user" },
    ]);

    if (!userFreq) {
        throw Error("DB aggregation error");
    }

    const item = await this.updateOne(
        { room },
        {
            $set: {
                "logs.totalchats": chatroom.chat.length,
                "logs.topuser": {
                    user: userFreq[0]._id,
                    messagecount: userFreq[0].count,
                },
                "logs.bottomuser": {
                    user: userFreq[userFreq.length - 1]._id,
                    messagecount: userFreq[userFreq.length - 1].count,
                },
            },
        }
    );

    return item;
};

chatroomSchema.statics.getChatrooms = async function () {
    const chatrooms = await this.find({}, { room: 1 });

    if (!chatrooms) {
        throw Error("Internal error");
    }

    return chatrooms;
};

chatroomSchema.statics.getChatroom = async function (chatroom) {
    const chatroomObject = await this.findOne({ room: chatroom });

    if (!chatroomObject) {
        throw Error("Such a room does not exist");
    }

    return chatroomObject;
};

chatroomSchema.statics.getChatroomDashboard = async function (chatroom) {
    const messageCount = await this.aggregate([
        { $match: { room: chatroom } },
        { $unwind: "$chat" },
        { $group: { _id: "$chat.user", count: { $sum: 1 } } },
    ]);

    const { logs } = await this.findOne(
        { room: chatroom },
        { _id: 0, logs: 1 }
    );

    return {
        messageCount,
        logs,
    };
};

chatroomSchema.statics.getMessageCountByUser = async function (chatroom, user) {
    const obj = await this.aggregate([
        { $match: { room: chatroom } },
        { $unwind: "$chat" },
        { $group: { _id: "$chat.user", count: { $sum: 1 } } },
        { $match: { _id: user } },
    ]);

    if (obj.length !== 0) {
        const { _id, count } = obj[0];

        return {
            count,
            chatroom,
        };
    } else {
        return {
            count: 0,
            chatroom,
        };
    }
};

module.exports = mongoose.model("Chatroom", chatroomSchema);
