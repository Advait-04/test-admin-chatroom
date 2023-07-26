require("dotenv").config();

const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chatroom");

const mongoose = require("mongoose");

// logger
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

app.use("/", userRoutes);
app.use("/", chatRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log("connected to db and on port 5000");
        });
    })
    .catch((error) => {
        console.log(error);
    });
