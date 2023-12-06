const express = require("express")
const LogOutModel = require("../Models/logOutMode")
const logOutRoute = express.Router()

logOutRoute.get("/", async (req, res) => {
    try {
        let token = req.headers.authorization?.split(" ")[1]
        let blacklistUser = LogOutModel({
            token: token
        })
        await blacklistUser.save()
        res.status(200).send({ "msg": "User Logged Out Sucessfully" })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

module.exports = logOutRoute