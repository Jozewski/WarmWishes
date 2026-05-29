import { getAllMessages } from "../../database/helpers.js"

const messageGetMany = async (req, res) => {
  try {
    const messages = getAllMessages()

    res.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error("Message get many error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error getting messages",
    })
  }
}

export default messageGetMany
