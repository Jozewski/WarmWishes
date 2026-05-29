import { getAllBuilders } from "../../database/helpers.js"

const builderGetMany = async (req, res) => {
  try {
    const builders = getAllBuilders()

    res.json({
      success: true,
      data: builders,
    })
  } catch (error) {
    console.error("Builder get many error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error getting builders",
    })
  }
}

export default builderGetMany
