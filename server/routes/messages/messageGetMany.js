import messageModel from "../../schemas/messageModel.js"

const messageGetMany = async (req, res) => {
  try {
    const messages = await messageModel.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      messages
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ message: "Error fetching messages.", error: error.message })
  }
}

export default messageGetMany
