import express from "express"
import builderCreate from "./builderCreate.js"
import builderGetMany from './builderGetMany.js'


const builderIndex = express.Router()

builderIndex.post("/", builderCreate)
builderIndex.get("/", builderGetMany)


export default builderIndex