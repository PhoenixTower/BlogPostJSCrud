const { User } = require("../model/userModel");
const jwt = require('jsonwebtoken');
const { validateSignup, validateLogin, validateGetAllUser } = require("../validation/userValidation")
const { exportFileFunction } = require("../utils/exportFileFunction")

async function signUp(req, res) {
    try {
        const data = req.body;
        const { error, value: payload } = await validateSignup(data)
        if (error) {
            return res.send({ data: {}, status: "false", msg: error.details[0].message })
        } else {

            const user = await User.findOne({ email: payload.email })
            if (!user) {
                let createUser = await User.create({
                    name: payload.name,
                    email: payload.email,
                    password: payload.password
                })
                return res.status(200).send({ data: createUser, status: "success", msg: "User register successfully" })
            } else {
                return res.status(400).send({ data: {}, status: "false", msg: "User already exist" })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ data: {}, status: "false", msg: "something went wrong" })
    }
}

async function login(req, res) {
    try {
        const data = req.body;
        const { error, value: payload } = await validateLogin(data)
        if (error) {
            return res.send({ data: {}, status: "false", msg: error.details[0].message })
        } else {

            const user = await User.findOne({ email: payload.email })
            if (user) {

                const isPassword = await User.findOne({ password: payload.password })

                if (isPassword) {

                    let accessToken = jwt.sign({ id: isPassword._id }, "SECRET");

                    await User.findOneAndUpdate({ email: isPassword.email },
                        {
                            $set: {
                                token: accessToken
                            }
                        })
                    const data = {
                        name: isPassword.name,
                        token: accessToken
                    }
                    return res.status(200).send({ data: data, status: "success", msg: "User login successfully" })
                } else {
                    return res.status(400).send({ data: {}, status: "false", msg: "Password does not match" })
                }
            } else {
                return res.status(400).send({ data: {}, status: "false", msg: "Email does not exist" })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ data: {}, status: "false", msg: "something went wrong" })
    }
}

async function getAllUser(req, res, next) {
    try {
        const data = req.body;
        const { error, value: payload } = await validateGetAllUser(data)
        if (error) {
            return res.send({ data: {}, status: "false", msg: error.details[0].message })
        } else {

            let options = {
                page: payload.page ? payload.page : 1,
                limit: payload.limit ? payload.limit : 10
            }

            const users = await User.paginate({}, options)

            const usersData = users.docs;
            let exportResponseData = [];
            for (let i = 0; i < usersData.length; i++) {
                exportResponseData.push([{
                    "username": `${usersData[i].name ? usersData[i].name : ""}`,
                    "email": `${usersData[i].email ? usersData[i].email : ""}`,
                    "date": `${usersData[i].date ? usersData[i].date : ""}`,
                }])
            }

            if (payload.exportFile) {
                const filePath = await exportFileFunction(payload.csvDownload, 'usersList', exportResponseData, res);
                return res.status(200).send({ data: filePath, status: "success", msg: "User fetched successfully" })
            } else {
                return res.status(200).send({ data: users, status: "success", msg: "User fetched successfully" })
            }

        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ data: {}, status: "false", msg: "something went wrong" })
    }
}

module.exports = { signUp, login, getAllUser }