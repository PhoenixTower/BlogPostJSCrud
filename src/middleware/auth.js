const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {

        const token = req.headers.authorization;
        if (!token) {
            next(new Error("Provided token!!"))
        }
        const decode = jwt.verify(token, 'SECRET');

        let user = await User.findOne({ _id: decode.id })
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        next(new Error("Auth Fail"))
    }
}
module.exports = { auth }