import express from "express"
import userCreate from "./userCreate.js"
import userLogin from "./userLogin.js"
import userMe from "./userMe.js"
import userLogout from "./userLogout.js"
import userGetMany from "./userGetMany.js"

const userIndex = express.Router()

userIndex.post("/", userCreate)
userIndex.post("/login", userLogin)
userIndex.get("/me/:token", userMe)
userIndex.get("/logout/:token", userLogout)
userIndex.get("/list", userGetMany)

export default userIndex