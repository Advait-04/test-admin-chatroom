const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    usage: {
        type: Number,
        required: true,
        default: 0,
    },
});

const dashboardSchema = new Schema({
    concurrentusers: [
        {
            type: String,
            required: true,
        },
    ],
    topuser: {
        type: userSchema,
        required: true,
    },
    bottomuser: {
        type: userSchema,
        required: true,
    },
});

dashboardSchema.statics.addDashboardItem = async function (
    concurrentusers,
    topuser,
    bottomuser
) {
    const dashboard = await this.create({
        concurrentusers,
        topuser,
        bottomuser,
    });

    return dashboard;
};

dashboardSchema.statics.getDashboardItem = async function () {
    const items = await this.find({}).sort({ _id: -1 }).limit(1);

    if (!items) {
        throw Error("No dashboard items");
    }

    return items[0];
};

dashboardSchema.statics.addConcurrentUser = async function (user) {
    const latestItem = await this.find({}).sort({ _id: -1 }).limit(1);

    const itemId = latestItem[0]._id.valueOf();

    console.log(user);

    const update = await this.findByIdAndUpdate(
        { _id: itemId },
        { $addToSet: { concurrentusers: user } },
        { new: true }
    );

    console.log(update);
    return update;
};

dashboardSchema.statics.removeConcurrentUser = async function (user) {
    const latestItem = await this.find({}).sort({ _id: -1 }).limit(1);

    const itemId = latestItem[0]._id.valueOf();

    const update = await this.findByIdAndUpdate(
        { _id: itemId },
        { $pull: { concurrentusers: user } },
        { new: true }
    );

    return update;
};

module.exports = mongoose.model("Dashboard", dashboardSchema);
