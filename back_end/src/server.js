require("dotenv").config();
const app = require("./app.js");
const connectDb = require("./config/database.js");

async function startServer() {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be set");
    }

    await connectDb();

    app.listen(3000, () => {
        console.log("server is running on port 3000");
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exitCode = 1;
});