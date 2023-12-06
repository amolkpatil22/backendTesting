const jwt = require("jsonwebtoken")
const LogOutModel = require("../Models/logOutMode")

const auth = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]
    try {
        let loginStatus = await LogOutModel.findOne({ token: token })
        if (!loginStatus) {
            jwt.verify(token, "masai", (err, decoded) => {
                if (err) {
                    res.status(200).send({ "msg": "Please Login" })
                }
                else {
                    req.body.userID = decoded.userID
                    next()
                }
            })
        }
        else {
            res.status(200).send({ "msg": "Please Login" })
        }
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
}

module.exports = auth