const mongoose = require("mongoose")

const LogOutSchema = mongoose.Schema({
    token: String
})


const LogOutModel = mongoose.model("blacklist", LogOutSchema)

module.exports = LogOutModel