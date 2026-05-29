import { createBuilder } from "../../database/helpers.js"

const builderCreate = async (req, res) => {
  try {
    const builder = req.body

    if (!builder?.projectType) {
      return res.status(400).json({
        success: false,
        message: "Project type is required",
      })
    }

    const createdBuilder = createBuilder(builder)

    res.status(201).json({
      success: true,
      data: createdBuilder,
    })
  } catch (error) {
    console.error("Builder create error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error creating builder",
    })
  }
}

export default builderCreate
