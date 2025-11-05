import express from "express"
import messageCreate from "./messageCreate.js"
import messageGetMany from "./messageGetMany.js"
import messageGetByProject from "./messageGetByProject.js"

const messageIndex = express.Router()

// Messages
messageIndex.post("/", messageCreate)
messageIndex.get("/", messageGetMany)
messageIndex.get("/project/:projectId", messageGetByProject)

export default messageIndex
