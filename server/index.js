import "dotenv/config"
import express from "express"
import cors from "cors"
import { initializeDatabase } from "./database/db.js"
import userIndex from "./routes/users/userIndex.js"
import projectIndex from "./routes/projects/projectIndex.js"
import builderIndex from "./routes/builders/builderIndex.js"
import contactIndex from "./contacts/contactIndex.js"
import dataSetIndex from "./routes/data/dataSetIndex.js"
import messageIndex from "./routes/messages/messageIndex.js"

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8000

// Initialize SQLite database
try {
    initializeDatabase()
    console.log('✓ Database initialized successfully')
}
catch(err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
}

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

app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`)
})
