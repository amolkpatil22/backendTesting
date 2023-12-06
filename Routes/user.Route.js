const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/userModel")
const userRoute = express.Router()

userRoute.post("/register", async (req, res) => {
    try {
        let isNewUser = await UserModel.findOne({ email: req.body.email })
        if (isNewUser) {
            res.status(200).send({ "msg": "User already exist, please login" })
        }
        else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    res.status(200).send({ "Error": `${err}` })
                }
                else {
                    let newuser = UserModel({ ...req.body, password: hash })
                    await newuser.save()
                    res.status(200).send({ "msg": "User Added sucessfully"})
                }
            })
        }
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})


userRoute.post("/login", async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(200).send({ "msg": "Invalid User Credentials" })
                }
                else {
                    let token = jwt.sign({ userID: user._id }, "masai", { expiresIn: "7d" })
                    res.status(200).send({ "msg": "User Logged Sucessfully", "token": token })
                }
            })
        }
        else {
            res.status(200).send({ "msg": "User not Found" })
        }
    }
    catch (err) {
        res.status(400).send({ "error": `${err}` })
    }
})




module.exports = userRoute