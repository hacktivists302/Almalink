import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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

// routes import
import userRoutes from "./routes/user.routes.js";
// import postRoutes from "./routes/post.routes.js";
// import commentRoutes from "./routes/comment.routes.js";
// import communityRouter from "./routes/community.routes.js";
import followerRouter from "./routes/follower.routes.js";
// import eventRouter from "./routes/event.routes.js";

// routes declaration
app.use("/api/v1/users/", userRoutes);
// app.use("/api/v1/posts/", postRoutes);
// app.use("/api/v1/comments/", commentRoutes);
// app.use("/api/v1/communities/", communityRouter);
app.use("/api/v1/followers/", followerRouter);
// app.use("/api/v1/events/", eventRouter);

export { app };
