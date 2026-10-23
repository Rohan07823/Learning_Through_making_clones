const mongoose = require("mongoose");

async function connectDb(){
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be set");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the Database");
}

module.exports = connectDb; 