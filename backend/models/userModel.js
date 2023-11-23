const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const logSchema = new Schema({
    chatrooms: [
        {
            type: String,
            required: true,
            default: [],
        },
    ],
    nooftotalchats: {
        type: Number,
        required: true,
        default: 0,
    },
    totalusage: {
        type: Number,
        required: true,
        default: 0,
    },
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    logs: {
        type: logSchema,
        required: true,
    },
});

//static signup method
userSchema.statics.signup = async function (email, password, logs) {
    //validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, logs });

    return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

userSchema.statics.updateChatrooms = async function (email, chatrooms) {
    if (!chatrooms) {
        throw Error("Field not entered");
    }

    const update = await this.updateOne(
        { email },
        { $addToSet: { "logs.chatrooms": chatrooms } }
    );

    if (!update) {
        throw Error("Incorrect email");
    }

    return update;
};

userSchema.statics.updateNoOfTotalChats = async function (email, updateValue) {
    if (!updateValue) {
        throw Error("Update Field not entered");
    }

    const update = await this.updateOne(
        { email },
        {
            $inc: { "logs.nooftotalchats": Number(updateValue) },
        }
    );

    if (update.matchedCount === 0) {
        throw Error("Incorrect email");
    }

    return update;
};

userSchema.statics.updateTotalUsage = async function (email, updateValue) {
    if (!updateValue) {
        throw Error("Update Field not entered");
    }

    const update = await this.updateOne(
        { email },
        {
            $inc: {
                "logs.totalusage": Number(updateValue),
            },
        }
    );

    if (update.matchedCount === 0) {
        throw Error("Incorrect email");
    }

    return update;
};

userSchema.statics.getTopUser = async function () {
    const users = await this.find({}).sort({ "logs.totalusage": -1 }).limit(1);

    if (!users) {
        throw Error("New app there is no chat");
    }

    const topUser = { user: users[0].email, usage: users[0].logs.totalusage };

    return topUser;
};

userSchema.statics.getBottomUser = async function () {
    const users = await this.find({}).sort({ "logs.totalusage": 1 }).limit(1);

    if (!users) {
        throw Error("New app there is no chat");
    }

    const bottomUser = {
        user: users[0].email,
        usage: users[0].logs.totalusage,
    };

    return bottomUser;
};

userSchema.statics.getUser = async function (email) {
    const user = await this.find({ email });

    if (!user) {
        throw Error("The user does not exist");
    }

    return user;
};

userSchema.statics.getAllUser = async function () {
    const users = await this.find({}, { _id: 1, email: 1 });

    return users;
};

module.exports = mongoose.model("User", userSchema);
