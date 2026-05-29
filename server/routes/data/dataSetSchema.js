import mongoose from "mongoose"

const Schema = mongoose.Schema

const dataSetSchema = new Schema({
 
  projectName:  String,
  items: [{
    image: String,
    description: String,
    weekly: Number,  
    monthly: Number,
    quarterly: Number,
    current: Number,
    goal: Number,
    lastUpdate: String
  }],
 
})

export default dataSetSchema

