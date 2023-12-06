const express = require("express")
const connection = require("./db/db")
const userRoute = require("./Routes/user.Route")
const logOutRoute = require("./Routes/logOut.Route")
const postRoute = require("./Routes/post.Route")
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.use("/users", userRoute)
app.use("/logout", logOutRoute)
app.use("/posts", postRoute)

app.listen(8080, async () => {
    try {
        await connection
        console.log("Connected to server")
        console.log("Server is Running")
    }
    catch (err) {
        console.log(err)
    }
})