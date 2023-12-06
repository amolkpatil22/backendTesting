const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/userModel")
const auth = require("../Middlewares/auth")
const PostModel = require("../Models/postModel")
const postRoute = express.Router()
postRoute.use(auth)

postRoute.post("/add", async (req, res) => {
    try {
        let newpost = PostModel(req.body)
        await newpost.save()
        res.status(200).send({ "msg": "New Post Added", "Post": newpost })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

postRoute.get("/", async (req, res) => {
    try {
        let posts = await PostModel.find({ userID: req.body.userID })
        res.status(200).send({ "msg": "data fetched sucessfully", "posts": posts })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})

postRoute.get("/top", async (req, res) => {
    try {
        let posts = await PostModel.find({ userID: req.body.userID })
        let toppost = posts.sort((a, b) => b.no_of_comments - a.no_of_comments)
        toppost=[toppost[0],toppost[1],toppost[2]]
        res.status(200).send({ "msg": "data fetched sucessfully", "posts": toppost })
    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})


postRoute.patch("/update/:id", async (req, res) => {
    let { id } = req.params
    try {
        let post = await PostModel.findOneAndUpdate({ userID: req.body.userID, _id: id }, req.body)
        if (post) {
            res.status(200).send({ "msg": "data updated sucessfully" })
        }
        else {
            res.status(200).send({ "msg": "User is not Authorized" })
        }

    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})
postRoute.delete("/delete/:id", async (req, res) => {
    let { id } = req.params
    try {
        let post = await PostModel.findOneAndDelete({ userID: req.body.userID, _id: id })
        if (post) {
            res.status(200).send({ "msg": "data Deleted sucessfully" })
        }
        else {
            res.status(200).send({ "msg": "User is not Authorized" })
        }

    }
    catch (err) {
        res.status(400).send({ "Error": `${err}` })
    }
})


module.exports = postRoute