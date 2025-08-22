import express from "express"
import projectCreate from "./projectCreate.js"
import projectUpdate from "./projectUpdate.js"
import projectGetMany from "./projectGetMany.js"
import projectUserCreate from "./projectUserCreate.js"
import projectGetOne from "./projectGetOne.js"
import projectTaskCreate from "./projectTaskCreate.js"
import projectTaskUpdate from "./projectTaskUpdate.js"
import projectTaskDelete from "./projectTaskDelete.js"

const projectIndex = express.Router()

// Projects
projectIndex.post("/", projectCreate)
projectIndex.put("/:projectId", projectUpdate)
projectIndex.get("/:email", projectGetMany)
projectIndex.get("/detail/:projectId", projectGetOne)
// Project users
projectIndex.post("/users/:projectId", projectUserCreate)
// Project tasks
projectIndex.post("/:projectId/tasks", projectTaskCreate)
projectIndex.put("/:projectId/tasks", projectTaskUpdate)
projectIndex.delete("/:projectId/tasks/:taskId", projectTaskDelete)


export default projectIndex
