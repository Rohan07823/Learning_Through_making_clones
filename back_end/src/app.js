const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes")

const cors = require('cors')


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:" http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/users",userRouter)

app.post("/api/auth/test", (req, res) => {
    res.status(200).json({
        message: "Auth route is working"
    });
});

module.exports = app;