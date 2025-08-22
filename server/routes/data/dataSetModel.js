import mongoose from "mongoose"
import dataSetSchema from "./dataSetSchema.js"

dataSetSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret._id  
    delete ret.__v
    return ret
  }
})


const dataSetModel = mongoose.model("dataSet", dataSetSchema)

export default dataSetModel