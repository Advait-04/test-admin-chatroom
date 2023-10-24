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
});

// static insert method
chatroomSchema.statics.sendChat = async function (room, user, text) {
    if (!room || !user || !text) {
        throw Error("All fields are required");
    }

    const chatroom = await this.findOne({ room });

    console.log("chatroom", chatroom);
    if (chatroom) {
        const chat = await this.updateOne(
            { room: room },
            { $push: { chat: [{ user, text }] } }
        );

        return chat;
    } else {
        const chat = this.create({ room, chat: [{ user, text }] });
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

module.exports = mongoose.model("Chatroom", chatroomSchema);
