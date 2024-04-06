const mongoose = require("mongoose")

async function connectMongoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog');
        console.log("Mongoose connection established");
    } catch (error) {
        console.log(error);
    }
}
module.exports = { connectMongoDB }