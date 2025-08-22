import express from "express"
import contactCreate from "./contactCreate.js"
import contactGetMany from './contactGetMany.js'


const contactIndex = express.Router()

contactIndex.post("/", contactCreate)
contactIndex.get("/:email", contactGetMany)

export default contactIndex