require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chatroom");
const adminRoutes = require("./routes/admin");

const mongoose = require("mongoose");

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/admin", adminRoutes);

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
