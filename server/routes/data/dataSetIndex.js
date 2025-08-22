import express from "express"
import dataSetCreate from "./dataSetCreate.js"
import dataSetGetMany from './dataSetGetMany.js'


const dataSetIndex = express.Router()

dataSetIndex.post("/", dataSetCreate)
dataSetIndex.get("/", dataSetGetMany)

export default dataSetIndex