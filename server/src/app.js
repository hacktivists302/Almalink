import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io"; // Import Socket.IO as ES Module
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/messages.routes.js";

const app = express();
const server = http.createServer(app); // Create HTTP server using app

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import communityRouter from "./routes/community.routes.js";
import followerRouter from "./routes/follower.routes.js";
import eventRouter from "./routes/event.routes.js";
import adminRouter from "./routes/admin.routes.js";
import adminEventRouter from "./routes/adminEvent.routes.js";

// Routes declaration
app.use("/api/v1/users/", userRoutes);
app.use("/api/v1/posts/", postRoutes);
app.use("/api/v1/comments/", commentRoutes);
app.use("/api/v1/communities/", communityRouter);
app.use("/api/v1/followers/", followerRouter);
app.use("/api/v1/events/", eventRouter);
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/admin/events/", adminEventRouter);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/messages", messageRoutes);

// Initialize Socket.IO with the HTTP server
const io = new SocketIOServer(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

// Socket.IO event handling
io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
        // Handle disconnection logic here if needed
    });
});

export { app, server }; // Export both app and server
