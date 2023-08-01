require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chatroom");

const mongoose = require("mongoose");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

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

// mongodb://0.0.0.0:27017/mern
// {useNewUrlParser: true,
//         // useFindAndModify: false,
//         useUnifiedTopology: true,}
