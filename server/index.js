import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import userIndex from "./routes/users/userIndex.js"
import projectIndex from "./routes/projects/projectIndex.js"
import builderIndex from "./routes/builders/builderIndex.js"
import contactIndex from "./contacts/contactIndex.js"
import dataSetIndex from "./routes/data/dataSetIndex.js"
import messageIndex from "./routes/messages/messageIndex.js"

const app = express()
app.use(express.json())
app.use(cors())
const port = 8000



app.use("/users", userIndex)
app.use("/projects", projectIndex)
app.use("/builders", builderIndex)
app.use("/contacts", contactIndex)
app.use("/dataset", dataSetIndex)
app.use("/messages", messageIndex)


app.all('*', (req, res) =>{
    res.status(404).json({
        success: false,
        data: '404'
    })
  })

try {
    const mongoURL = process.env.MONGODB_CONNECTION_STRING || ""
    await mongoose.connect(mongoURL)
    console.log(`Project Tracker connected to database ${mongoURL}`)
    
    app.listen(port, () => {
        console.log(`Project Tracker app listening on port ${port}`)
    })
}

catch(err) {
    console.log(err)
}
